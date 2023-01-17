import {ApiProperty} from '@nestjs/swagger'
import {CheckUser} from '@contact/type'
import {IsNotEmpty} from 'class-validator'

export class CheckUserDto implements CheckUser {
  @IsNotEmpty()
  @ApiProperty({
    nullable: false,
  })
  username: string
}
