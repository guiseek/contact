import {UserImpl, MeetingImpl, AgendaImpl, DeviceImpl} from './entities'
import {UserServiceImpl, ClientServiceImpl} from './services'
import {UserService, ClientService, Client} from './ports'
import {ClientSchema} from './schemas/client.schema'
import {DataSource, Repository} from 'typeorm'
import {Provider} from '@nestjs/common'
import {Connection, Model} from 'mongoose'

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
  {
    provide: 'client.model',
    useFactory: (connection: Connection) => {
      return connection.model('Client', ClientSchema)
    },
    inject: ['data.mongo'],
  },
  {
    provide: ClientService,
    useFactory: (client: Model<Client>) => {
      return new ClientServiceImpl(client)
    },
    inject: ['client.model'],
  },
]
