import {catchError, filter, map, switchMap, take, tap} from 'rxjs'
import {
  AuthRequest,
  AuthResponse,
  AuthUserLogged,
  CreateUser,
  HttpErrorResponse,
} from '@contact/type'
import {State, StorageService} from '@contact/shared/data-access'
import {AuthService} from '../domain/auth.service'
import {AuthFacade} from '../domain/auth.facade'

interface AuthState {
  user: AuthUserLogged | null
  error: string | null
  isAuthenticated: boolean
  loading: boolean
}

export class AuthFacadeImpl extends State<AuthState> implements AuthFacade {
  loading$ = this.select((state) => state.loading)

  isAuthenticated$ = this.select((state) => state.isAuthenticated)

  error$ = this.select((state) => state.error)

  user$ = this.select((state) => state.user).pipe(
    filter((user) => user !== null)
  )

  constructor(
    private authService: AuthService,
    private storage: StorageService
  ) {
    super({
      user: null,
      error: null,
      isAuthenticated: false,
      loading: false,
    })
  }

  signIn(request: AuthRequest) {
    this.update('loading', true)
    this.authService
      .login(request)
      .pipe(
        take(1),
        catchError(this.throwError),
        switchMap((response) => {
          this.setAccessToken(response)
          return this.authService.validateUser()
        })
      )
      .subscribe((user) => {
        this.patch({user, isAuthenticated: true, loading: false})
      })
  }

  signUp(createUser: CreateUser) {
    this.update('loading', true)
    this.authService
      .createUser(createUser)
      .pipe(
        take(1),
        catchError(this.throwError),
        map(({username}) => {
          const {password} = createUser
          return {username, password}
        })
      )
      .subscribe((request) => {
        this.signIn(request)
        this.update('loading', false)
      })
  }

  validate() {
    return this.authService.validateUser().pipe(
      take(1),
      tap((user) => {
        this.patch({user})
      })
    )
  }

  signOut() {
    this.storage.removeItem('accessToken')
  }

  throwError = <T>(err: HttpErrorResponse, caught: T) => {
    if (err && err.error) {
      this.patch({error: err.error.message})
      throw err
    }
    return caught
  }

  setAccessToken({accessToken}: AuthResponse) {
    this.storage.setItem('accessToken', accessToken)
  }

  getAccessToken() {
    this.storage.getItem('accessToken')
  }
}
