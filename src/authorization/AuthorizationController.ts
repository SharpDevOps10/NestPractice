import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/CreateUserDTO';
import { AuthService } from './AuthorizationService';
import { RegisterTelegramDTO } from './dto/RegisterTelegramDTO';
import { TelegramGuard } from '../security/TelegramGuard';

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

  @ApiBearerAuth()
  @ApiOkResponse()
  @UseGuards(TelegramGuard)
  @Post('/registerTelegram')
  async registerTelegram (
    @Body() body: RegisterTelegramDTO,
  ) {
    this.authService.registerTelegram(body);
  }

}
