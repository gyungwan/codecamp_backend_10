import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { IOAuthUser } from './interface/auth-service.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('google'))
  @Get('/login/google')
  async loginGoogle(
    @Req() req: Request & IOAuthUser, // 이 req안에 구글porfile이 담겨져 있음
    @Res() res: Response,
  ) {
    // let user = await this.usersService.findOne({ email: req.user.email }); //여기서 그 프로필 안에 있는 email을 뽑아서 email안에 넣어서 그걸로 일치하는 유저를 찾아서 user안에 넣어주었다
    // //뽑아낸 email이 가입이 안되어 있다면 회원가입을 먼저 해주었고 가입이 되어 있다면 다음 코드로 넘어감
    // if (!user) user = await this.usersService.create({ ...req.user });
    // //가입이 되어 있다면 그 이메일로 로그인을 하는데 refreshToken을 프로트엔드 쪽으로 넘겨줌으로서 소셜로그인을 마무리 지음
    // this.authService.setRefreshToken({ user, res });
    // res.redirect(
    //   'http://localhost:5500/main-project/frontend/login/index.html',
    //);

    this.authService.loginOAuth({ req, res });
  }

  @UseGuards(AuthGuard('naver'))
  @Get('/login/naver')
  async loginNaver(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    this.authService.loginOAuth({ req, res });
  }

  @UseGuards(AuthGuard('kakao'))
  @Get('/login/kakao')
  async loginKakao(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    this.authService.loginOAuth({ req, res });
  }
}
