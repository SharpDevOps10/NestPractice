import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './UsersController';
import { UsersService } from './UsersService';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './UsersModel';
import { Role } from '../roles/RolesModel';
import { UserRoles } from '../roles/UsersRolesModel';
import { RolesModule } from '../roles/RolesModule';
import { AuthorizationModule } from '../authorization/AuthorizationModule';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([Users, Role, UserRoles]),
    RolesModule,
    forwardRef(() => AuthorizationModule),
  ],
  exports: [
    UsersService,
  ],
})
export class UsersModule {}
