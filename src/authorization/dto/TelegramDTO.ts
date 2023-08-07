import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../../utils/Globals';

export class TelegramDTO {
  @ApiProperty()
  @IsNumber()
    auth_date: number;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('First name cannot be empty'))
    first_name: string;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('hash cannot be empty'))
    hash: string;

  @ApiProperty()
  @IsNumber()
    id: number;

  @ApiPropertyOptional()
  @IsOptional()
    last_name: string;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Photo url cannot be empty'))
    photo_url: string;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Username cannot be empty'))
    username: string;
}
