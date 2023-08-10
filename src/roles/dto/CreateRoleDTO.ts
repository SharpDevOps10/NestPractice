import { IsString } from 'class-validator';

export class CreateRoleDTO {
  @IsString({ message: 'Role must be a string' })
  readonly value: string;

  @IsString({ message: 'Description must be a string' })
  readonly description: string;
}
