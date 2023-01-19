import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from '../ports/user.service';
import { CreateDeviceDto } from '../dto/device';
import { DeviceImpl } from '../entities/device.impl';
import { UserImpl } from '../entities/user.impl';
import { NotFoundException } from '@nestjs/common';

export class UserServiceImpl implements UserService {
  constructor(
    private users: Repository<UserImpl>,
    private devices: Repository<DeviceImpl>
  ) {}

  async findAll() {
    return this.users.find();
  }

  async createOne(createUserDto: CreateUserDto) {
    return this.users.save(createUserDto);
  }

  async createDevice(createDeviceDto: CreateDeviceDto) {
    return this.devices.save(createDeviceDto);
  }

  async findDevices(user: Pick<UserImpl, 'id'>) {
    return this.devices.find({ where: { user } });
  }

  async removeDevice(id: number) {
    return (await this.findOneDevice({ id })).remove();
  }

  async findOneById(id: number) {
    return this.findOne({ id });
  }

  async findOneByUsername(username: string) {
    return this.findOne({ username });
  }

  async findOne(where: FindOptionsWhere<UserImpl>) {
    const user = await this.users.findOne({ where });
    if (!user) throw new NotFoundException(`User not found.`);
    return user;
  }

  async findOneDevice(where: FindOptionsWhere<DeviceImpl>) {
    const device = await this.devices.findOne({ where });
    if (!device) throw new NotFoundException(`Device not found.`);
    return device;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (await this.findOne({ id })) {
      return this.users.save({ id, ...updateUserDto });
    }
  }

  async remove(id: number) {
    let user: UserImpl;
    if ((user = await this.findOne({ id }))) {
      return this.users.remove(user);
    }
  }
}
