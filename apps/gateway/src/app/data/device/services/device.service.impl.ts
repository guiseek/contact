import { Repository } from 'typeorm';
import { CreateDeviceDto } from '../dto/create-device.dto';
import { UpdateDeviceDto } from '../dto/update-device.dto';
import { DeviceService } from '../ports/device.service';
import { Device } from '@contact/type';

export class DeviceServiceImpl implements DeviceService {
  constructor(private deviceRepository: Repository<Device>) {}

  async findAll() {
    return this.deviceRepository.find();
  }

  async createOne(createDeviceDto: CreateDeviceDto) {
    return this.deviceRepository.save(createDeviceDto);
  }

  async findOneById(id: number) {
    return this.deviceRepository.findOneBy({ id });
  }

  async findOne(value: Partial<Device>) {
    return this.deviceRepository.findOneBy(value);
  }

  async update(id: number, updateDeviceDto: UpdateDeviceDto) {
    const device = await this.deviceRepository.findOneBy({ id });
    if (!device) throw new Error(`Device with id ${id} not found`);
    return this.deviceRepository.save({ id, ...updateDeviceDto });
  }

  async remove(id: number) {
    const device = await this.deviceRepository.findOneBy({ id });
    if (!device) throw new Error(`Device with id ${id} not found`);
    return this.deviceRepository.remove(device);
  }
}
