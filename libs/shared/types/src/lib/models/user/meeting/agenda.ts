import {User} from '../user'
import {UserRole} from '../user-role'
import {Meeting} from './meeting'

export interface Agenda {
  id: number
  user: User
  roles: UserRole[]
  meeting: Meeting
}
