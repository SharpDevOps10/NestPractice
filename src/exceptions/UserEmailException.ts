import { HttpException, HttpStatus } from '@nestjs/common';

export class UserEmailException extends HttpException {
  constructor () {
    super('User with this email exists', HttpStatus.BAD_REQUEST);
  }
}
