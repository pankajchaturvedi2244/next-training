import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! 2';
  }
  getHello2(): string {
    return 'Hey Ram! 2';
  }
  getHello3(): string {
    return 'Hey Ram! 3 Inside path';
  }
}
