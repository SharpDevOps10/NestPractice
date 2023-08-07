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
import { CreateUserResponse } from './responses/CreateUserResponse';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor (
    private userService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Creating user' })
  @ApiOkResponse({
    type: CreateUserResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException:
      Value cannot be empty
      Description is too short (min: 2)
      Description is too long (max: 100)
      Description cannot be empty
      Value type must be an enum
      
    ObjectIsRequiredException:
      Value is required`,
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
