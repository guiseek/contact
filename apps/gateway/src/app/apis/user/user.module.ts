import { Module } from '@nestjs/common';
import { DEVICE_PROVIDERS, USER_PROVIDERS } from '../../data';
import { UserController } from './user.controller';
import { UserDevicesController } from './user-devices.controller';

@Module({
  controllers: [UserController, UserDevicesController],
  providers: [...USER_PROVIDERS, ...DEVICE_PROVIDERS],
  // exports: [],
})
export class UserModule {}
