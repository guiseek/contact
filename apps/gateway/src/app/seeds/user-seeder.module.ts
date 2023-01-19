import {Module, Provider} from '@nestjs/common'
import {DataSource, Repository} from 'typeorm'
import {UserImpl} from '../data/user/entities/user.impl'
import {UserSeederService} from './user-seeder.service'

const USER_SEEDER_PROVIDERS: Provider<unknown>[] = [
  {
    provide: 'user.repository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserImpl),
    inject: ['data.source'],
  },
  {
    provide: UserSeederService,
    useFactory: (user: Repository<UserImpl>) => new UserSeederService(user),
    inject: ['user.repository'],
  },
]

@Module({
  providers: USER_SEEDER_PROVIDERS,
  exports: USER_SEEDER_PROVIDERS,
})
export class UserSeederModule {}
