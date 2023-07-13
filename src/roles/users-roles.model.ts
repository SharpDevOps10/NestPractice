import { Model, Column, DataType, Table, ForeignKey } from 'sequelize-typescript';
import { Role } from './roles.model';
import { Users } from '../users/users.model';



@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {

  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
    roleId: number;
  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;
}
