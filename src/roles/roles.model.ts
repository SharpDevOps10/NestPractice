import { Model, Column, DataType, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface RoleCreationAttribute {
  value: string;
  description: string;
}
@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttribute> {
  @ApiProperty({ example: '1', description: 'Unique id' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;
  @ApiProperty({ example: 'ADMIN', description: 'The value of user`s role' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
    value: string;
  @Column({ type: DataType.STRING, allowNull: false })
  @ApiProperty({ example: 'Administrator', description: 'Description of role' })
    description: string;
}
