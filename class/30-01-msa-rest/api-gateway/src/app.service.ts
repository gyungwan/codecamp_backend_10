import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  aaa(num1: number, num2: number, unit: string): string {
    return 'Hello World!';
  }
}
