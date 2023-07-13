import { Model, Column, DataType, Table, BelongsToMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/users-roles.model';

interface UserCreationAttribute {
  email: string;
  password: string;
}
@Table({ tableName: 'users' })
export class Users extends Model<Users, UserCreationAttribute> {
  @ApiProperty({ example: '1', description: 'Unique id' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;
  @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  @ApiProperty({ example: 'hui12345', description: 'User`s password' })
    password: string;
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  @ApiProperty({ example: 'true', description: 'Banned or not' })
    banned: boolean;
  @Column({ type: DataType.STRING, allowNull: true })
  @ApiProperty({ example: 'for bad behavior', description: 'The reason of ban' })
    banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
    users: Users[];
}
