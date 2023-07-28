import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDTO';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Users } from './users.model';
import { Roles } from '../authorization/roles-auth.decorator';
import { RolesGuard } from '../authorization/roles.guard';
import { AddRoleDto } from './dto/AddRoleDTO';
import { BanUserDto } from './dto/BanUserDTO';

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
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll () {
    return this.userService.getAllUsers();
  }
  @ApiOperation({ summary: 'Give role' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole (@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @ApiOperation({ summary: 'Ban this user' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/ban')
  ban (@Body() dto: BanUserDto) {
    return this.userService.ban(dto);
  }
}
