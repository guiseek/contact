import { Global, Module } from '@nestjs/common';
import { DATA_PROVIDERS } from './data.providers';

@Global()
@Module({
  providers: [...DATA_PROVIDERS],
  exports: [...DATA_PROVIDERS],
})
export class DataModule {}
