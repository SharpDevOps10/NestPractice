import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/CreateUserDTO';
import { AuthService } from './AuthorizationService';

@ApiTags('Authorization')
@Controller('authorization')
export class AuthorizationController {
  constructor (
    private authService: AuthService,
  ) {}

  @Post('/login')
  login (
    @Body() user: CreateUserDto,
  ) {
    return this.authService.login(user);
  }

  @Post('/registration')
  registration (
    @Body() user: CreateUserDto,
  ) {
    return this.authService.registration(user);
  }

}
