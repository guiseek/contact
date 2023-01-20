import {ApiProperty} from '@nestjs/swagger'
import {AuthUserLogged, UserRole} from '@contact/type'

export class AuthUserResponseDto implements AuthUserLogged {
  @ApiProperty()
  id: number

  @ApiProperty()
  username: string

  @ApiProperty()
  email: string

  @ApiProperty()
  displayName: string

  @ApiProperty()
  roles: UserRole[]

  constructor(
    id: number,
    email: string,
    username: string,
    displayName: string,
    roles: UserRole[]
  ) {
    this.id = id
    this.email = email
    this.username = username
    this.displayName = displayName
    this.roles = roles
  }
}
