import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  // constructor() {}

  @MessagePattern({ cmd: 'fetchBoards' })
  fetchBoards() {
    //실제 데이터 조회하기
    return '게시믈 데이터 보내주기';
  }
}
