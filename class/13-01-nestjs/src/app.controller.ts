import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/qqq')
  getHello(): string {
    return this.appService.aaa(2000, 1000, '원');
  }
}
