import { CreateUser, Device, UpdateUser, User } from '@contact/type';
import { CreateDeviceDto } from '../dto/device';

export abstract class UserService {
  abstract findAll(): Promise<User[]>;
  abstract createOne(createUser: CreateUser): Promise<User>;
  abstract createDevice(createDeviceDto: CreateDeviceDto): Promise<Device>;
  abstract findOneById(id: number): Promise<User>;
  abstract findOne(where: Partial<User>): Promise<User>;
  abstract findOneByUsername(username: string): Promise<User | null>;
  abstract findDevices(user: Pick<User, 'id'>): Promise<Device[]>;
  abstract update(id: number, updateUser: UpdateUser): Promise<User>;
  abstract remove(id: number): Promise<User>;
}
