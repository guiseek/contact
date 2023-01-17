import { Provider } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { DeviceServiceImpl } from './services/device.service.impl';
import { DeviceService } from './ports/device.service';
import { DeviceImpl } from './entities/device.impl';
import { Device } from '@contact/type';

export const DEVICE_PROVIDERS: Provider<unknown>[] = [
  {
    provide: 'device.repository',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(DeviceImpl),
    inject: ['data.source'],
  },
  {
    provide: DeviceService,
    useFactory: (deviceRepository: Repository<Device>) =>
      new DeviceServiceImpl(deviceRepository),
    inject: ['device.repository'],
  },
];
