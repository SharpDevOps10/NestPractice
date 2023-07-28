import { IsNumber, IsString } from 'class-validator';

export class BanUserDto {
  @IsNumber({}, { message: 'User id must be a number' })
  readonly userId: number;
  @IsString({ message: 'The reason of ban must be a string' })
  readonly banReason: string;
}
