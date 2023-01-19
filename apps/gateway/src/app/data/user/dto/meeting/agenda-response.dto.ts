import {ApiProperty, PartialType} from '@nestjs/swagger'
import {CreateAgendaDto} from './create-agenda.dto'
import {Agenda} from '@contact/type'

export class AgendaResponseDto extends PartialType(CreateAgendaDto) {
  @ApiProperty()
  id: number

  constructor(agenda: Agenda) {
    super()
    Object.assign(this, agenda)
  }
}
