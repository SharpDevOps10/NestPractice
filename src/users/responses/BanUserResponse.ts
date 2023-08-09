import { ApiProperty } from '@nestjs/swagger';

export class BanUserResponse {
  @ApiProperty()
    id: number;

  @ApiProperty()
    email: string;

  @ApiProperty()
    password: string;

  @ApiProperty()
    banned: boolean;

  @ApiProperty()
    banReason: string;

  @ApiProperty()
    updatedAt: Date;

  @ApiProperty()
    createdAt: Date;
}
