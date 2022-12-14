import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthServiceGetAccessToken } from '../users/interfaces/users-service.interface';
import { UsersService } from '../users/users.service';
import { IAuthServiceSetRefreshToken } from './interface/auth-service.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //

    private readonly userService: UsersService,
  ) {}

  setRefreshToken({ user, res }: IAuthServiceSetRefreshToken): void {
    console.log(process.env.JWT_REFRESH_KEY);
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: process.env.JWT_REFRESH_KEY, expiresIn: '2w' },
    );
    //@ts-ignore
    res.setHeader('Set-Cookie', `refreshToken= ${refreshToken}; path=/;`);
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: process.env.JWT_ACCESS_KEY, expiresIn: '1h' },
    );
  }
  //req res를 인자로 받아와서 안에서 사용할수 있게 해준다
  async loginOAuth({ req, res }) {
    let user = await this.userService.findOne({ email: req.user.email }); //여기서 그 프로필 안에 있는 email을 뽑아서 email안에 넣어서 그걸로 일치하는 유저를 찾아서 user안에 넣어주었다

    //뽑아낸 email이 가입이 안되어 있다면 회원가입을 먼저 해주었고 가입이 되어 있다면 다음 코드로 넘어감
    if (!user) user = await this.userService.create({ ...req.user });

    //가입이 되어 있다면 그 이메일로 로그인을 하는데 refreshToken을 프로트엔드 쪽으로 넘겨줌으로서 소셜로그인을 마무리 지음
    this.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/main-project/frontend/login/index.html',
    );
  }
}
