import {ApiProperty} from '@nestjs/swagger'
import {CheckUserResponse} from '@contact/shared/types'

export class CheckUserResponseDto implements CheckUserResponse {
  @ApiProperty()
  exists: boolean

  @ApiProperty()
  message: string

  constructor(exists: boolean, message: string) {
    this.exists = exists
    this.message = message
  }
}
