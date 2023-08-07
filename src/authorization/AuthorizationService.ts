import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/CreateUserDTO';
import { UsersService } from '../users/UsersService';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Users } from '../users/UsersModel';
import { UserEmailException } from '../exceptions/UserEmailException';
import { InvalidDataException } from '../exceptions/InvalidDataException';
import { RegisterTelegramDTO } from './dto/RegisterTelegramDTO';

export const ONE_MINUTE = 1000 * 60;
export const HOUR = ONE_MINUTE * 60;

@Injectable()
export class AuthService {

  private registerTelegramTokens: Map<string, number> = new Map();

  constructor (
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login (userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration (userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) throw new UserEmailException();

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken (user: Users) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser (userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEquals) return user;

    throw new InvalidDataException();
  }

  registerTelegram (register: RegisterTelegramDTO) {
    let telegramKey;
    for (const [key, value] of this.registerTelegramTokens.entries()) {
      if (value === register.telegramId) {
        telegramKey = key;
        break;
      }
    }
    if (telegramKey) this.registerTelegramTokens.delete(telegramKey);
    this.registerTelegramTokens.set(register.token, register.telegramId);

    setTimeout(() => {
      this.registerTelegramTokens.delete(register.token);
    }, HOUR);
  }

}
