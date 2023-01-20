import {UserResponse, HttpService, UpdateUser, CreateMeeting, AgendaResponse, UpdateMeeting, MeetingResponse, SearchUser, CreateAgenda} from '@contact/type'
import {UserService} from '../domain/user.service'

export class UserServiceImpl implements UserService {
  constructor(readonly http: HttpService) {}

  findAll() {
    return this.http.get<UserResponse[]>(`/api/user`)
  }

  findOneById(id: number) {
    return this.http.get<UserResponse | null>(`/api/user/${id}`)
  }

  findOneByUsername(username: string) {
    return this.http.get<UserResponse | null>(`/api/user/${username}`)
  }

  findAgenda() {
    return this.http.get<AgendaResponse[]>(`/api/user/agenda`)
  }

  createMeeting(createMeeting: CreateMeeting) {
    return this.http.post<AgendaResponse>(`/api/user/meeting`, createMeeting)
  }

  createAgendaOnMeeting(meetingId: number, createAgenda: CreateAgenda) {
    return this.http.post<AgendaResponse>(`/api/user/meeting/${meetingId}/agenda`, createAgenda)
  }

  searchUser(searchUser: SearchUser) {
    return this.http.post<UserResponse[]>(`/api/user/search`, searchUser)
  }

  updateMeeting(id: number, value: UpdateMeeting) {
    return this.http.patch<MeetingResponse>(`/api/user/meeting/${id}`, value)
  }

  deleteMeeting(id: number) {
    return this.http.delete<MeetingResponse>(`/api/user/meeting/${id}`)
  }

  findOneMeeting(id: number) {
    return this.http.get<MeetingResponse>(`/api/user/meeting/${id}`)
  }

  update(id: number, updateUser: UpdateUser) {
    return this.http.patch<UserResponse>(`/api/user/${id}`, updateUser)
  }

  remove(id: number) {
    return this.http.delete<UserResponse>(`/api/user/${id}`)
  }
}
