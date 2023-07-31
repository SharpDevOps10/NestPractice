import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PostsService } from './PostsService';
import { CreatePostsDTO } from './dto/CreatePostsDTO';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {

  constructor (
    private postService: PostsService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost (
    @Body() dto: CreatePostsDTO,
    @UploadedFile() image,
  ) {
    return this.postService.create(dto, image);
  }

}
