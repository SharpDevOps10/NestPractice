import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor () {
    super('User is not authorized', HttpStatus.UNAUTHORIZED);
  }
}
