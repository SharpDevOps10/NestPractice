import { Injectable } from '@nestjs/common';
import path from 'node:path';
import fs from 'node:fs';
import * as uuid from 'uuid';
import { WritingFileException } from '../exceptions/WritingFileException';
@Injectable()
export class FilesService {

  async createFile (file): Promise<string> {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      throw new WritingFileException();
    }
  }



}
