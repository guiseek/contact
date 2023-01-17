import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';
import { UpdateDevice } from '@contact/type';
import { CreateUserDto } from '../../user/dto';

export class UpdateDeviceDto extends PartialType(CreateUserDto) {
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
  id: number;
}
