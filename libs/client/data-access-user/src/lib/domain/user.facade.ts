import {
  AgendaResponse,
  CreateAgenda,
  CreateMeeting,
  MeetingResponse,
  SearchUser,
  UpdateMeeting,
  UpdateUser,
  Contact,
  UserResponse,
} from '@contact/shared/types'
import {Observable} from 'rxjs'

export abstract class UserFacade {
  abstract loading$: Observable<boolean>
  abstract error$: Observable<string | null>
  abstract user$: Observable<UserResponse | null>
  abstract users$: Observable<UserResponse[]>
  abstract contacts$: Observable<Contact[]>
  abstract agenda$: Observable<AgendaResponse[]>
  abstract meeting$: Observable<MeetingResponse | null>

  abstract loadUsers(): void
  abstract loadContacts(): void
  abstract loadOneById(id: number): void
  abstract updateUser(user: UpdateUser): void
  abstract createMeeting(createMeeting: CreateMeeting): void
  abstract searchUser(searchUser: SearchUser): void
  abstract loadOneMeeting(id: number): void
  abstract updateMeeting(value: UpdateMeeting): void
  abstract deleteMeeting(id: number): void
  abstract createAgendaOnMeeting(
    meetingId: number,
    createAgenda: CreateAgenda
  ): void
  abstract loadAgenda(): void
}
