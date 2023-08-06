import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
  @ApiProperty()
  @IsString({ message: 'Role must be a string' })
  readonly value: string;

  @ApiProperty()
  @IsNumber({}, { message: 'Role id must be a number' })
  readonly userId: number;
}
