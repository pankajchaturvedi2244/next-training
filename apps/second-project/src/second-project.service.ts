import { Injectable } from '@nestjs/common';

@Injectable()
export class SecondProjectService {
  getHello(): string {
    return 'Hello World!';
  }
}
