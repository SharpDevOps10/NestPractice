import { Module } from '@nestjs/common';
import { FilesService } from './FilesService';

@Module({
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
