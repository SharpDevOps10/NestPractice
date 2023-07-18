import { forwardRef, Module } from '@nestjs/common';
import { AuthorizationController } from './authorization.controller';
import { AuthService } from './authorization.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthorizationController],
  providers: [AuthService],
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
  ],
})
export class AuthorizationModule {}
