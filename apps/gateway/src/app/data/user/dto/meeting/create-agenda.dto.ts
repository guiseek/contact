import {CreateAgenda, User, UserRole} from '@contact/shared/types'
import {IsArray, IsNotEmpty} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'

export class CreateAgendaDto implements CreateAgenda {
  @ApiProperty()
  @IsNotEmpty()
  user: Pick<User, 'id'>

  @ApiProperty()
  @IsArray()
  roles: UserRole[]
}
