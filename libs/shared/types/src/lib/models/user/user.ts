import {UserContact} from './user-contact'
import {Device} from './device'
import {Meeting} from './meeting'
import {UserRole} from './user-role'

export interface User {
  id: number
  username: string
  password: string
  salt: string
  email: string
  photoUrl: string
  displayName: string
  firstName: string
  lastName: string
  birthday?: string
  roles: UserRole[]
  devices?: Device[]
  meetings?: Meeting[]
  contacts?: UserContact[]
  isAdmin: boolean
  status: boolean
  createdAt: Date
  updatedAt: Date
}
