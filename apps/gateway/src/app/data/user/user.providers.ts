import {UserServiceImpl} from './services/user.service.impl'
import {MeetingImpl} from './entities/meeting.impl'
import {AgendaImpl} from './entities/agenda.impl'
import {DeviceImpl} from './entities/device.impl'
import {UserService} from './ports/user.service'
import {DataSource, Repository} from 'typeorm'
import {UserImpl} from './entities/user.impl'
import {Provider} from '@nestjs/common'

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
    provide: 'meeting.repository',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MeetingImpl),
    inject: ['data.source'],
  },
  {
    provide: 'agenda.repository',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(AgendaImpl),
    inject: ['data.source'],
  },
  {
    provide: UserService,
    useFactory: (
      user: Repository<UserImpl>,
      device: Repository<DeviceImpl>,
      meeting: Repository<MeetingImpl>,
      agenda: Repository<AgendaImpl>
    ) => new UserServiceImpl(user, device, meeting, agenda),
    inject: [
      'user.repository',
      'device.repository',
      'meeting.repository',
      'agenda.repository',
    ],
  },
]
