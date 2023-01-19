import {ApiProperty} from '@nestjs/swagger'
import {PartialType} from '@nestjs/mapped-types'
import {IsNumber} from 'class-validator'
import {CreateDeviceDto} from './create-device.dto'

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {
  // @IsString()
  // @ApiProperty({
  //   nullable: false,
  // })
  // label: string;

  // @IsString()
  // @ApiProperty({
  //   nullable: false,
  // })
  // deviceId: string;

  // @IsString()
  // @ApiProperty({
  //   nullable: false,
  // })
  // groupId: string;

  // @ApiProperty({
  //   nullable: false,
  // })
  // kind: MediaDeviceKind;

  // @IsNumber()
  // @ApiProperty({
  //   nullable: false,
  // })
  // userId: number;

  @IsNumber()
  @ApiProperty({
    nullable: false,
  })
  id: number
}
