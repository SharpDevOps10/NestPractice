import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/UsersModule';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { Users } from './users/UsersModel';
import { RolesModule } from './roles/RolesModule';
import { Role } from './roles/RolesModel';
import { UserRoles } from './roles/UsersRolesModel';
import { AuthorizationModule } from './authorization/AuthorizationModule';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGREST_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Users, Role, UserRoles],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthorizationModule,
  ],

})
export class AppModule {}
