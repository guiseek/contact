import { Module } from '@nestjs/common';
import { AUTH_PROVIDERS, USER_PROVIDERS } from '../../data';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { apisOptions } from '../config/apis-options';
import { JwtStrategy, LocalStrategy } from './strategies';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: apisOptions.jwtSecret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    JwtStrategy,
    ...USER_PROVIDERS,
    ...AUTH_PROVIDERS,
  ],
})
export class AuthModule {}
