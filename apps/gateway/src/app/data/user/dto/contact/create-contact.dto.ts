import {IsNumber, IsOptional, IsString} from 'class-validator'
import {CreateContact, User} from '@contact/shared/types'
import {ApiProperty} from '@nestjs/swagger'

export class CreateContactDto implements CreateContact {
  @IsString()
  @ApiProperty({
    nullable: false,
  })
  displayName: string

  @IsString()
  @ApiProperty({
    nullable: false,
  })
  photoUrl: string

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    nullable: false,
  })
  user: Partial<User>
}
