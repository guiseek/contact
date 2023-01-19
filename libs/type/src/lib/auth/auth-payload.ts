import {UserRole} from '../user'

export interface AuthPayload {
  sub: number
  username: string
  displayName: string
  email: string
  roles: UserRole[]
}
