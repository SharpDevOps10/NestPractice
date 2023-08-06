import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDTO';
import { UsersService } from './UsersService';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Users } from './UsersModel';
import { Roles } from '../authorization/RolesAuthDecorator';
import { RolesGuard } from '../authorization/RolesGuard';
import { AddRoleDto } from './dto/AddRoleDTO';
import { BanUserDto } from './dto/BanUserDTO';
import { AddRoleResponse } from './responses/AddRoleResponse';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor (
    private userService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Creating user' })
  @ApiResponse({ status: 200, type: Users })
  @Post()
  create (
    @Body() user: CreateUserDto,
  ) {
    return this.userService.createUser(user);
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
  @ApiOkResponse({
    type: AddRoleResponse,
  })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      Value cannot be empty
      UserId cannot be empty`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  addRole (
    @Body() role: AddRoleDto,
  ) {
    return this.userService.addRole(role);
  }

  @ApiOperation({ summary: 'Ban this user' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/ban')
  ban (
    @Body() body: BanUserDto,
  ) {
    return this.userService.ban(body);
  }
}
