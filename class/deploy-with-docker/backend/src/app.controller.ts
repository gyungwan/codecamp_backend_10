import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  getHello(): string {
    return '상태확인 완료';
  }
}
