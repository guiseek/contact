import {ApiProperty} from '@nestjs/swagger'
import {AuthResponse} from '@contact/shared/types'

export class AuthResponseDto implements AuthResponse {
  @ApiProperty()
  accessToken: string

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }
}
