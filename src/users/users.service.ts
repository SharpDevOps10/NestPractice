import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';
import { CreateUserDto } from './dto/CreateUserDTO';

@Injectable()
export class UsersService {
  constructor (@InjectModel(Users) private userRepository: typeof Users) {


  }

  async createUser (dto: CreateUserDto) {
    return await this.userRepository.create(dto);
  }

  async getAllUsers () {
    return await this.userRepository.findAll();
  }
}
