import { Module } from '@nestjs/common';
import { MEET_PROVIDERS } from '../../data';

@Module({
  providers: [...MEET_PROVIDERS],
  exports: [...MEET_PROVIDERS],
})
export class MeetModule {}
