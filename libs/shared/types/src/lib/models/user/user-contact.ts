import {UserRole} from './user-role'

export interface UserContact {
  id: number
  username: string
  email: string
  photoUrl: string
  displayName: string
  firstName: string
  lastName: string
  birthday?: string
  roles: UserRole[]
}
