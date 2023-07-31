import { HttpException, HttpStatus } from '@nestjs/common';

export class WritingFileException extends HttpException {
  constructor () {
    super('An error occurred while writing the file', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
