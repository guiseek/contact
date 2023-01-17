import { CreateDevice, UpdateDevice, Device } from '@contact/type';

export abstract class DeviceService {
  abstract findAll(): Promise<Device[]>;
  abstract createOne(createDevice: CreateDevice): Promise<Device>;
  abstract findOneById(id: number): Promise<Device>;
  abstract findOne(props: Partial<Device>): Promise<Device | null>;
  abstract update(id: number, updateDevice: UpdateDevice): Promise<Device>;
  abstract remove(id: number): Promise<Device>;
}
