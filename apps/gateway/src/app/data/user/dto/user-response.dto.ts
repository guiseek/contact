import {UserResponse, User, UserRole, Device, Meeting, Contact} from '@contact/shared/types'
import {ApiHideProperty, ApiProperty} from '@nestjs/swagger'
import {Exclude} from 'class-transformer'

export class UserResponseDto implements UserResponse {
  @ApiProperty()
  id: number

  @ApiProperty()
  username: string

  @ApiProperty()
  email: string

  @ApiProperty()
  displayName: string

  @ApiProperty()
  firstName: string

  @ApiProperty()
  lastName: string

  @ApiProperty()
  photoUrl: string

  @ApiProperty()
  birthday?: string

  @ApiProperty()
  roles: UserRole[]

  @ApiProperty()
  status: boolean

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  @Exclude()
  @ApiHideProperty()
  password: string

  @Exclude()
  @ApiHideProperty()
  salt: string

  @ApiProperty()
  devices?: Device[]

  @ApiProperty()
  meetings?: Meeting[]

  @ApiProperty()
  contacts?: Contact[]

  @Exclude()
  @ApiHideProperty()
  isAdmin: boolean

  constructor(user: User) {
    Object.assign(this, user)
  }
}
