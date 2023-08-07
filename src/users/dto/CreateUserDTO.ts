import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'The email is not a valid email address' })
  readonly email: string;

  @IsString({ message: 'Password must be a string' })
  @ApiProperty({ example: 'hui12345', description: 'Password' })
  @Length(4, 16, { message: 'Not less than 4 and not more than 16' })
  readonly password: string;
}
