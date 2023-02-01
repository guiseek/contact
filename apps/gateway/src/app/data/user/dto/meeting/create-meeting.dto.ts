import {IsBoolean, IsOptional, IsString} from 'class-validator'
import {CreateMeeting} from '@contact/shared/types'
import {ApiProperty} from '@nestjs/swagger'

export class CreateMeetingDto implements CreateMeeting {
  @IsString()
  @ApiProperty()
  title: string

  @IsString()
  @ApiProperty()
  start: Date

  @IsString()
  @ApiProperty()
  @IsOptional()
  end?: Date

  @ApiProperty()
  @IsBoolean()
  visible: boolean
}
