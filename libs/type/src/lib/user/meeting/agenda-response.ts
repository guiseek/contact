import {UserRole} from '../user-role'
import {Meeting} from './meeting'
import {User} from '../user'

export interface AgendaResponse {
  id: number
  user: Partial<User>
  roles: UserRole[]
  meeting: Meeting
}
