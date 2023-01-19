import {Logger, Module} from '@nestjs/common'
import {DataModule} from '../data/data.module'
import {UserSeederModule} from './user-seeder.module'
import {Seeder} from './seeder'

@Module({
  imports: [DataModule, UserSeederModule],
  providers: [Logger, Seeder],
})
export class SeederModule {}
