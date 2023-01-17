import { Device } from './device';

export interface DeviceResponse extends Device {
  createdAt: Date;
  updateAt: Date;
}
