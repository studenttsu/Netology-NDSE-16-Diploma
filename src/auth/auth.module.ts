import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthSerializer } from './auth-serializer';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      session: true,
    }),
  ],
  controllers: [AuthController],
  providers: [LocalStrategy, AuthSerializer, AuthGuard],
})
export class AuthModule {}
