import { IsNumber, IsString } from 'class-validator';

export class CreatePostsDTO {
  @IsString({ message: 'Title must be a string' })
  readonly title: string;
  @IsString({ message: 'Content must be a string' })
  readonly content: string;
  @IsNumber({}, { message: 'User id id must be a number' })
  readonly userId: number;
}
