import { ApiProperty } from '@nestjs/swagger';
import { RolesParam } from '../dto/RolesParam';

export class CreateUserResponse {
  @ApiProperty()
    id: number;

  @ApiProperty({
    enum: RolesParam,
  })
    rolesParam: RolesParam;

  @ApiProperty()
    description: string;

  @ApiProperty()
    updatedAt: Date;

  @ApiProperty()
    createdAt: Date;
}
