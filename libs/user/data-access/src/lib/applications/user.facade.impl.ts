import {AgendaResponse, CreateAgenda, CreateMeeting, HttpErrorResponse, MeetingResponse, SearchUser, UpdateMeeting, UpdateUser, UserResponse} from '@contact/type'
import {UserService} from '../domain/user.service'
import {State} from '@contact/shared/data-access'
import {UserFacade} from '../domain/user.facade'
import {catchError, take} from 'rxjs'

interface UserState {
  loading: boolean
  error: string | null
  user: UserResponse | null
  meeting: MeetingResponse | null
  agenda: AgendaResponse[]
  users: UserResponse[]
}

const initialValue: UserState = Object.freeze({
  loading: false,
  error: null,
  user: null,
  meeting: null,
  agenda: [],
  users: [],
})

export class UserFacadeImpl extends State<UserState> implements UserFacade {
  loading$ = this.select((state) => state.loading)
  error$ = this.select((state) => state.error)
  agenda$ = this.select((state) => state.agenda)
  meeting$ = this.select((state) => state.meeting)
  user$ = this.select((state) => state.user)
  users$ = this.select((state) => state.users)

  constructor(private userService: UserService) {
    super(initialValue)
  }

  searchUser(searchUser: SearchUser) {
    this.setState({loading: true})
    this.userService
      .searchUser(searchUser)
      .pipe(take(1), catchError(this.throwError))
      .subscribe((users) => {
        this.setState({users, loading: false})
      })
  }

  createMeeting(createMeeting: CreateMeeting) {
    this.setState({loading: true})
    this.userService
      .createMeeting(createMeeting)
      .pipe(take(1), catchError(this.throwError))
      .subscribe((meeting) => {
        const agenda = [...this.state.agenda, meeting]
        this.setState({agenda, loading: false})
      })
  }

  createAgendaOnMeeting(meetingId: number, createAgenda: CreateAgenda) {
    this.setState({loading: true})
    this.userService
      .createAgendaOnMeeting(meetingId, createAgenda)
      .pipe(take(1), catchError(this.throwError))
      .subscribe((latestAgenda) => {
        const agenda = [...this.state.agenda, latestAgenda]
        this.setState({agenda, loading: false})
      })
  }

  updateMeeting(value: UpdateMeeting) {
    this.setState({loading: true})
    this.userService
      .updateMeeting(value.id, value)
      .pipe(take(1), catchError(this.throwError))
      .subscribe((meeting) => {
        console.log(meeting)
        this.setState({loading: false})
        this.loadAgenda()
      })
  }

  loadOneMeeting(id: number): void {
    this.setState({loading: true})
    this.userService
      .findOneMeeting(id)
      .pipe(take(1), catchError(this.throwError))
      .subscribe((meeting) => {
        this.setState({meeting, loading: false})
      })
  }

  deleteMeeting(id: number): void {
    this.setState({loading: true})
    this.userService
      .deleteMeeting(id)
      .pipe(take(1), catchError(this.throwError))
      .subscribe((meeting) => {
        this.setState({meeting, loading: false})
        this.loadAgenda()
      })
  }

  loadAgenda() {
    this.setState({loading: true})
    this.userService
      .findAgenda()
      .pipe(take(1), catchError(this.throwError))
      .subscribe((agenda) => {
        this.setState({agenda, loading: false})
      })
  }

  loadOneById(id: number): void {
    this.setState({loading: true})
    this.userService
      .findOneById(id)
      .pipe(take(1), catchError(this.throwError))
      .subscribe((user) => {
        this.setState({user, loading: false})
      })
  }

  updateUser(user: UpdateUser): void {
    this.setState({loading: true})
    this.userService
      .update(user.id, user)
      .pipe(take(1), catchError(this.throwError))
      .subscribe((user) => {
        this.setState({user, loading: false})
      })
  }

  throwError = <T>(err: HttpErrorResponse, caught: T) => {
    if (err && err.error) {
      this.setState({error: err.error.message})
      throw err
    }
    return caught
  }
}
