import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  //constructor() {}

  @MessagePattern({ aaa: '이름' })
  login(data) {
    //실제 로그인 하기

    console.log(data);

    return 'accessToken!!';
  }

  logout() {
    //
  }
}
