import {IsString} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'
import {SearchUser} from '@contact/shared/types'

export class SearchUserDto implements SearchUser {
  @IsString()
  @ApiProperty({
    nullable: false,
  })
  query: string
}
