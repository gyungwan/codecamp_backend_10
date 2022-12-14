import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { IOAuthUser } from './interface/auth-service.interface';

@Controller()
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('google'))
  @Get('/login/google')
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    let user = await this.usersService.findOne({ email: req.user.email });

    if (!user) user = await this.usersService.create({ ...req.user });

    this.authService.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/main-project/frontend/login/index.html',
    );
  }

  @UseGuards(AuthGuard('naver'))
  @Get('/login/naver')
  async loginNaver(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    let user = await this.usersService.findOne({ email: req.user.email });

    if (!user) user = await this.usersService.create({ ...req.user });

    this.authService.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/main-project/frontend/login/index.html',
    );
  }

  @UseGuards(AuthGuard('kakao'))
  @Get('/login/kakao')
  async loginKakao(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    let user = await this.usersService.findOne({ email: req.user.email });

    if (!user) user = await this.usersService.create({ ...req.user });

    this.authService.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/main-project/frontend/login/index.html',
    );
  }

  @Get('favicon.ico')
  favicon(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    res.status(204).end();
  }
}
