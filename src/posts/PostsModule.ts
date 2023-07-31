import { Module } from '@nestjs/common';
import { PostsController } from './PostsController';
import { PostsService } from './PostsService';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './PostsModel';
import { Users } from '../users/UsersModel';
import { FilesModule } from '../files/FilesModule';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    SequelizeModule.forFeature([Users, Post]),
    FilesModule,
  ],
})
export class PostsModule {}
