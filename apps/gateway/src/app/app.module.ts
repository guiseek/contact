import {Module} from '@nestjs/common'

import {AppController} from './app.controller'
import {AppService} from './app.service'
import {DataModule} from './data/data.module'
import {UserModule} from './apis/user/user.module'
import {AuthModule} from './apis/auth/auth.module'
import {CaslModule} from './apis/casl/casl.module'
import {AppGateway} from './app.gateway'

@Module({
  imports: [DataModule, UserModule, AuthModule, CaslModule],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
