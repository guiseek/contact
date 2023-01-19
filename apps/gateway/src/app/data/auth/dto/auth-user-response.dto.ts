import {ApiProperty} from '@nestjs/swagger'
import {AuthUserLogged} from '@contact/type'

export class AuthUserResponseDto implements AuthUserLogged {
  @ApiProperty()
  id: number

  @ApiProperty()
  username: string

  @ApiProperty()
  email: string

  @ApiProperty()
  displayName: string

  constructor(
    id: number,
    email: string,
    username: string,
    displayName: string
  ) {
    this.id = id
    this.email = email
    this.username = username
    this.displayName = displayName
  }
}
