import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDTO';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Users } from './users.model';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor (private userService: UsersService) {}

  @ApiOperation({ summary: 'Creating user' })
  @ApiResponse({ status: 200, type: Users })
  @Post()
  create (@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Getting users' })
  @ApiResponse({ status: 200, type: [Users] })
  @Get()
  getAll () {
    return this.userService.getAllUsers();
  }
}
