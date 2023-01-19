import { Module } from '@nestjs/common';
import { USER_PROVIDERS } from '../../data';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [...USER_PROVIDERS],
  // exports: [],
})
export class UserModule {}
