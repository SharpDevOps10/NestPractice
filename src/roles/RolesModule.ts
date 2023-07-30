import { Module } from '@nestjs/common';
import { RolesService } from './RolesService';
import { RolesController } from './RolesController';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './RolesModel';
import { Users } from '../users/UsersModel';
import { UserRoles } from './UsersRolesModel';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    SequelizeModule.forFeature([Role, Users, UserRoles]),
  ],
  exports: [
    RolesService,
  ],
})
export class RolesModule {}
