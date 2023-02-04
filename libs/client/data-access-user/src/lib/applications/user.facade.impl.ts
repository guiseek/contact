import {
  AgendaResponse,
  CreateAgenda,
  CreateMeeting,
  HttpErrorResponse,
  MeetingResponse,
  SearchUser,
  UpdateMeeting,
  UpdateUser,
  Contact,
  UserResponse,
} from '@contact/shared/types'
import {UserService} from '../domain/user.service'
import {State, freeze} from '@contact/shared/data-access'
import {UserFacade} from '../domain/user.facade'
import {catchError, take} from 'rxjs'

interface UserState {
  loading: boolean
  error: string | null
  user: UserResponse | null
  meeting: MeetingResponse | null
  agenda: AgendaResponse[]
  users: UserResponse[]
  contacts: Contact[]
}

const initialValue: UserState = freeze<UserState>({
  loading: false,
  error: null,
  user: null,
  meeting: null,
  agenda: [],
  contacts: [],
  users: [],
})

export class UserFacadeImpl extends State<UserState> implements UserFacade {
  loading$ = this.select((state) => state.loading)
  error$ = this.select((state) => state.error)
  agenda$ = this.select((state) => state.agenda)
  meeting$ = this.select((state) => state.meeting)
  user$ = this.select((state) => state.user)
  users$ = this.select((state) => state.users)
  contacts$ = this.select((state) => state.contacts)

  constructor(private userService: UserService) {
    super(initialValue)
  }

  loadUsers() {
    this.update('loading', true)
    this.userService
      .findAll()
      .pipe(take(1), catchError(this.throwError))
      .subscribe((users) => {
        console.log(users)

        this.patch({users, loading: false})
      })
  }

  loadContacts() {
    this.update('loading', true)
    this.userService
      .findContacts()
      .pipe(take(1), catchError(this.throwError))
      .subscribe((user) => {
        console.log(user)

        this.patch({contacts: user.contacts, loading: false})
      })
  }

  searchUser(searchUser: SearchUser) {
    this.update('loading', true)
    this.userService
      .searchUser(searchUser)
      .pipe(take(1), catchError(this.throwError))
      .subscribe((users) => {
        this.patch({users, loading: false})
      })
  }

  createMeeting(createMeeting: CreateMeeting) {
    this.update('loading', true)
    this.userService
      .createMeeting(createMeeting)
      .pipe(take(1), catchError(this.throwError))
      .subscribe((meeting) => {
        const agenda = [...this.state.agenda, meeting]
        this.patch({agenda, loading: false})
      })
  }

  createAgendaOnMeeting(meetingId: number, createAgenda: CreateAgenda) {
    this.update('loading', true)
    this.userService
      .createAgendaOnMeeting(meetingId, createAgenda)
      .pipe(take(1), catchError(this.throwError))
      .subscribe((latestAgenda) => {
        const agenda = [...this.state.agenda, latestAgenda]
        this.patch({agenda, loading: false})
      })
  }

  updateMeeting(value: UpdateMeeting) {
    this.update('loading', true)
    this.userService
      .updateMeeting(value.id, value)
      .pipe(take(1), catchError(this.throwError))
      .subscribe((meeting) => {
        console.log(meeting)
        this.patch({loading: false})
        this.loadAgenda()
      })
  }

  loadOneMeeting(id: number): void {
    this.update('loading', true)
    this.userService
      .findOneMeeting(id)
      .pipe(take(1), catchError(this.throwError))
      .subscribe((meeting) => {
        this.patch({meeting, loading: false})
      })
  }

  deleteMeeting(id: number): void {
    this.update('loading', true)
    this.userService
      .deleteMeeting(id)
      .pipe(take(1), catchError(this.throwError))
      .subscribe((meeting) => {
        this.patch({meeting, loading: false})
        this.loadAgenda()
      })
  }

  loadAgenda() {
    this.update('loading', true)
    this.userService
      .findAgenda()
      .pipe(take(1), catchError(this.throwError))
      .subscribe((agenda) => {
        this.patch({agenda, loading: false})
      })
  }

  loadOneById(id: number): void {
    this.update('loading', true)
    this.userService
      .findOneById(id)
      .pipe(take(1), catchError(this.throwError))
      .subscribe((user) => {
        this.patch({user, loading: false})
      })
  }

  updateUser(user: UpdateUser): void {
    this.update('loading', true)
    this.userService
      .update(user.id, user)
      .pipe(take(1), catchError(this.throwError))
      .subscribe((user) => {
        this.patch({user, loading: false})
      })
  }

  throwError = <T>(err: HttpErrorResponse, caught: T) => {
    if (err && err.error) {
      this.patch({error: err.error.message})
      throw err
    }
    return caught
  }
}
