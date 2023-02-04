import {ApiProperty, IntersectionType} from '@nestjs/swagger'
import {CreateAgendaDto} from './create-agenda.dto'
import {Agenda, AgendaResponse, Meeting} from '@contact/shared/types'
import {UserResponseDto} from '../user-response.dto'

export class AgendaResponseDto
  extends IntersectionType(CreateAgendaDto, class {})
  implements AgendaResponse
{
  @ApiProperty()
  id: number

  @ApiProperty()
  meeting: Meeting

  constructor({user, ...agenda}: Agenda) {
    super()
    Object.assign(this, agenda, {user: new UserResponseDto(user)})
  }
}
