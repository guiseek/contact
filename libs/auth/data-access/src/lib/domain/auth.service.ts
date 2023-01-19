import {CheckUser, CreateUser, AuthRequest, UserResponse, AuthResponse, CheckUserResponse, AuthUserLogged} from '@contact/type'
import {Observable} from 'rxjs'

export abstract class AuthService {
  abstract validateUser(): Observable<AuthUserLogged>
  abstract checkUser(user: CheckUser): Observable<CheckUserResponse>
  abstract createUser(user: CreateUser): Observable<UserResponse>
  abstract login(request: AuthRequest): Observable<AuthResponse>
}
