import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';
import { UserModule } from './apis/user/user.module';
import { AuthModule } from './apis/auth/auth.module';
import { MeetModule } from './apis/meet/meet.module';

@Module({
  imports: [DataModule, UserModule, AuthModule, MeetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
