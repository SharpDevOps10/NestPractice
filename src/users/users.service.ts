import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';
import { CreateUserDto } from './dto/CreateUserDTO';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/AddRoleDTO';
import { InvalidRoleException } from '../exceptions/InvalidRoleException';

@Injectable()
export class UsersService {
  constructor (
    @InjectModel(Users) private userRepository: typeof Users,
    private roleService: RolesService,
  ) {


  }

  async createUser (dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('ADMIN');
    await user.$set('roles', [role.id]);
    return user;
  }

  async getAllUsers () {
    return await this.userRepository.findAll(
      {
        include: {
          all: true,
        },
      },
    );
  }

  async getUserByEmail (email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
      include: {
        all: true,
      },
    });
  }
  async addRole (dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new InvalidRoleException();
  }

}
