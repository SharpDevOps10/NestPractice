import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './UsersModel';
import { CreateUserDto } from './dto/CreateUserDTO';
import { RolesService } from '../roles/RolesService';
import { AddRoleDto } from './dto/AddRoleDTO';
import { InvalidRoleException } from '../exceptions/InvalidRoleException';
import { BanUserDto } from './dto/BanUserDTO';
import { UserNotFoundException } from '../exceptions/UserNotFoundException';

@Injectable()
export class UsersService {
  constructor (
    @InjectModel(Users) private userRepository: typeof Users,
    private roleService: RolesService,
  ) {}

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

  async ban (dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) throw new UserNotFoundException();

    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();

    return user;
  }

}
