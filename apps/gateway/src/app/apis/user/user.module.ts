import {Module} from '@nestjs/common'
import {APP_GUARD} from '@nestjs/core'
import {USER_PROVIDERS} from '../../data'
import {UserController} from './user.controller'
import {RolesGuard} from './guards'
import {CaslModule} from '../casl/casl.module'

@Module({
  imports: [CaslModule],
  controllers: [UserController],
  providers: [
    ...USER_PROVIDERS,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  // exports: [],
})
export class UserModule {}
