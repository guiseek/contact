import {ApiProperty, IntersectionType} from '@nestjs/swagger'
import {AgendaResponse, Meeting, MeetingResponse} from '@contact/type'
import {AgendaResponseDto} from './agenda-response.dto'
import {CreateMeetingDto} from './create-meeting.dto'

export class MeetingResponseDto extends IntersectionType(CreateMeetingDto, class {}) implements MeetingResponse {
  @ApiProperty()
  id: number

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  @ApiProperty()
  agenda: AgendaResponse[]

  constructor(meeting: Meeting) {
    super()

    const agenda =
      meeting.agenda &&
      meeting.agenda.map((item) => {
        return new AgendaResponseDto(item)
      })

    Object.assign(this, meeting, {agenda})
  }
}
