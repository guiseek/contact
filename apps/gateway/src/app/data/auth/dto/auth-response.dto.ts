import {ApiProperty} from '@nestjs/swagger'
import {AuthResponse} from '@contact/type'

export class AuthResponseDto implements AuthResponse {
  @ApiProperty()
  accessToken: string

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }
}
