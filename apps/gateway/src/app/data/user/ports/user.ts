import {UserRole, User as UserType} from '@contact/shared/types'

export class User implements UserType {
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
  status: boolean
  createdAt: Date
  updatedAt: Date

  get isAdmin() {
    return this.roles.includes(UserRole.Admin)
  }

  constructor(value: Partial<UserType>) {
    Object.assign(this, value)
  }
}
