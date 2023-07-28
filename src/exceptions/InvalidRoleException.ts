import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidRoleException extends HttpException {
  constructor () {
    super('User or role id were not found', HttpStatus.NOT_FOUND);
  }
}
