import {ApiProperty, PartialType} from '@nestjs/swagger'
import {IsNumber} from 'class-validator'
import {CreateMeetingDto} from './create-meeting.dto'

export class UpdateMeetingDto extends PartialType(CreateMeetingDto) {
  @IsNumber()
  @ApiProperty({
    nullable: true,
  })
  id: number
}
