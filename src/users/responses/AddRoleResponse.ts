import { ApiProperty } from '@nestjs/swagger';

export class AddRoleResponse {
  @ApiProperty()
    value: string;

  @ApiProperty()
    userId: number;
}
