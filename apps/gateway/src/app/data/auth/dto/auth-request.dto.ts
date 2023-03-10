import {IsString, MinLength} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'
import {AuthRequest} from '@contact/shared/types'

export class AuthRequestDto implements AuthRequest {
  @IsString()
  @ApiProperty({
    nullable: false,
  })
  username: string

  @IsString()
  @MinLength(6)
  @ApiProperty({
    nullable: false,
  })
  password: string
}
