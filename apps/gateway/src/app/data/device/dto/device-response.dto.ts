import { Device } from '@contact/type';
import { ApiProperty } from '@nestjs/swagger';

export class DeviceResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  label: string;

  @ApiProperty()
  deviceId: string;

  @ApiProperty()
  groupId: string;

  @ApiProperty()
  kind: MediaDeviceKind;

  @ApiProperty()
  userId: number;

  constructor(device: Device) {
    Object.assign(this, device);
  }
}
