import { Injectable } from '@nestjs/common';
import { Post } from './PostsModel';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostsDTO } from './dto/CreatePostsDTO';
import { FilesService } from '../files/FilesService';

@Injectable()
export class PostsService {
  constructor (
    @InjectModel(Post) private postRepository: typeof Post,
    private fileService: FilesService,
  ) {}

  async create (dto: CreatePostsDTO, image: any) {
    const fileName = await this.fileService.createFile(image);
    return await this.postRepository.create({ ...dto, image: fileName });
  }

}
