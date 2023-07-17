import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/CreateUserDTO';
import { AuthService } from './authorization.service';

@ApiTags('Authorization')
@Controller('authorization')
export class AuthorizationController {
  constructor (private authService: AuthService) {}

  @Post('/registration')
  registration (@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

}
