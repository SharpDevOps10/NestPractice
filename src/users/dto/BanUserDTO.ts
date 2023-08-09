import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
  @ApiProperty()
  @IsNumber({}, { message: 'User id must be a number' })
  readonly userId: number;

  @ApiProperty()
  @IsString({ message: 'The reason of ban must be a string' })
  readonly banReason: string;
}
