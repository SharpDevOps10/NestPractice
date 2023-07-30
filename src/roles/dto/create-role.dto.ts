import { IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString({ message: 'Role must be a string' })
  readonly value: string;
  @IsString({ message: 'Description must be a string' })
  readonly description: string;
}
