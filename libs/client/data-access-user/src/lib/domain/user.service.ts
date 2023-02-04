import {
  AgendaResponse,
  CreateAgenda,
  CreateMeeting,
  MeetingResponse,
  SearchUser,
  UpdateMeeting,
  UpdateUser,
  UserResponse,
} from '@contact/shared/types'
import {Observable} from 'rxjs'

export abstract class UserService {
  abstract findAll(): Observable<UserResponse[]>

  abstract findOneById(id: number): Observable<UserResponse | null>

  abstract findOneByUsername(username: string): Observable<UserResponse | null>

  abstract findAgenda(): Observable<AgendaResponse[]>
  abstract findContacts(): Observable<UserResponse>

  abstract searchUser(searchUser: SearchUser): Observable<UserResponse[]>

  abstract createMeeting(
    createMeeting: CreateMeeting
  ): Observable<AgendaResponse>

  abstract updateMeeting(
    id: number,
    value: UpdateMeeting
  ): Observable<MeetingResponse>

  abstract findOneMeeting(id: number): Observable<MeetingResponse>

  abstract deleteMeeting(id: number): Observable<MeetingResponse>

  abstract createAgendaOnMeeting(
    meetingId: number,
    createAgenda: CreateAgenda
  ): Observable<AgendaResponse>

  abstract update(id: number, updateUser: UpdateUser): Observable<UserResponse>

  abstract remove(id: number): Observable<UserResponse>
}
