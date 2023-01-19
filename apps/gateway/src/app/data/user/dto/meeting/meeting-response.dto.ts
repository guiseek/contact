import {ApiProperty, PartialType} from '@nestjs/swagger'
import {CreateMeetingDto} from './create-meeting.dto'
import {Agenda, Meeting} from '@contact/type'

export class MeetingResponseDto extends PartialType(CreateMeetingDto) {
  @ApiProperty()
  id: number

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
