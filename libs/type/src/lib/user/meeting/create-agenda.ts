import {UserRole} from '../user-role'
import {Meeting} from './meeting'
import {User} from '../user'

export interface CreateAgenda {
  user: Pick<User, 'id'>
  roles: UserRole[]
  meeting: Meeting
}
