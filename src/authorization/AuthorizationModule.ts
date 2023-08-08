import { forwardRef, Module } from '@nestjs/common';
import { AuthorizationController } from './AuthorizationController';
import { AuthService } from './AuthorizationService';
import { UsersModule } from '../users/UsersModule';
import { JwtModule } from '@nestjs/jwt';
import { TelegramConfigService } from '../config/TelegramConfigService';

@Module({
  controllers: [AuthorizationController],
  providers: [AuthService, TelegramConfigService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [
    AuthService,
    JwtModule,
    TelegramConfigService,
  ],
})
export class AuthorizationModule {}
