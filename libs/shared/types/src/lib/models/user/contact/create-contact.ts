import {User} from '../user'

export interface CreateContact {
  user: Partial<User>
  displayName: string
  photoUrl: string
}
