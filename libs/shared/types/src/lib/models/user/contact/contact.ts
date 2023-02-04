import {User} from '../user'

export interface Contact {
  id: number
  displayName: string
  photoUrl: string
  status: boolean
  user: User
  createdAt: Date
  updatedAt: Date
}
