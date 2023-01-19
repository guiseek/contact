import {CreateAgenda, Meeting, User, UserRole} from '@contact/type'
import {IsEnum, IsNotEmpty} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'

export class CreateAgendaDto implements CreateAgenda {
  @ApiProperty()
  @IsNotEmpty()
  user: Pick<User, 'id'>

  @ApiProperty()
  @IsEnum(UserRole)
  roles: UserRole[]

  @ApiProperty()
  @IsNotEmpty()
  meeting: Meeting
}
