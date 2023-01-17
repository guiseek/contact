import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateDevice } from '@contact/type';

export class CreateDeviceDto implements CreateDevice {
  @IsString()
  @ApiProperty({
    nullable: false,
  })
  label: string;

  @IsString()
  @ApiProperty({
    nullable: false,
  })
  deviceId: string;

  @IsString()
  @ApiProperty({
    nullable: false,
  })
  groupId: string;

  @ApiProperty({
    nullable: false,
  })
  kind: MediaDeviceKind;

  @IsNumber()
  @ApiProperty({
    nullable: false,
  })
  userId: number;
}
