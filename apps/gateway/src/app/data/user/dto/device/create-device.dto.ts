import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateDevice, User } from '@contact/type';

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

  @IsString()
  @ApiProperty({
    nullable: false,
  })
  kind: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    nullable: false,
  })
  user: Partial<User>;
  // @IsNumber()
  // @IsOptional()
  // @ApiProperty({
  //   nullable: false,
  // })
  // userId: number;
}
