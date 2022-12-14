import { Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

//여기서 서비스 넘어가서 비지니스 로직 하고 여기서 게이트웨이로 가는?

@Controller()
export class AppController {
  constructor(
    //
    @Inject('AUTH_SERVICE')
    private readonly clientAuthService: ClientProxy,

    @Inject('RESOURCE_SERVICE')
    private readonly clientResourceService: ClientProxy,
  ) {}

  @Post('/auth/login')
  login() {
    //auth-service로  트래픽 넘겨주기
    return this.clientAuthService.send(
      { aaa: '이름' },
      { email: 'a@a.com', password: '1234' },
    );
  }

  @Get('/boards')
  fetchBoards() {
    //resource-service로  트래픽 넘겨주기

    return this.clientResourceService.send({ cmd: 'fetchBoards' }, {});
  }
}
