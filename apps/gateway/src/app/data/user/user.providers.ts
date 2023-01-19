import { Provider } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserServiceImpl } from './services/user.service.impl';
import { UserService } from './ports/user.service';
import { UserImpl } from './entities/user.impl';
import { DeviceImpl } from './entities/device.impl';

export const USER_PROVIDERS: Provider<unknown>[] = [
  {
    provide: 'user.repository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserImpl),
    inject: ['data.source'],
  },
  {
    provide: 'device.repository',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(DeviceImpl),
    inject: ['data.source'],
  },
  {
    provide: UserService,
    useFactory: (
      userRepository: Repository<UserImpl>,
      deviceRepository: Repository<DeviceImpl>
    ) => new UserServiceImpl(userRepository, deviceRepository),
    inject: ['user.repository', 'device.repository'],
  },
];
