import {ApiProperty, PartialType} from '@nestjs/swagger'
import {IsNumber} from 'class-validator'
import {CreateUserDto} from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNumber()
  @ApiProperty({
    nullable: true,
  })
  id: number
}
