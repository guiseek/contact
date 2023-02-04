import {Module} from '@nestjs/common'
import {UserModule} from '../user/user.module'
import {RingGateway} from './ring.gateway'

@Module({
  imports: [UserModule],
  providers: [RingGateway],
})
export class CallModule {}
