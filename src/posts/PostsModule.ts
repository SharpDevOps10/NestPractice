import { Module } from '@nestjs/common';
import { PostsController } from './PostsController';
import { PostsService } from './PostsService';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './PostsModel';
import { Users } from '../users/UsersModel';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    SequelizeModule.forFeature([Users, Post]),
  ],
})
export class PostsModule {}
