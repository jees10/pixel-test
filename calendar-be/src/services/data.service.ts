import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DataService {
  
  constructor() {}

  private dbPath = path.join(process.cwd(), 'data/db.json');

  readDB() {
    const raw = fs.readFileSync(this.dbPath, 'utf8');
    return JSON.parse(raw);
  }

  writeDB(data: any) {
    fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2), 'utf8');
  }
}
