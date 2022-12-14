import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver'; //네이버 소셜로그인을 위한 passport yarn add 해오기
//네이버에 있는 strategy가 등록이 됨
export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/naver',
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken, refreshToken, profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);

    return {
      name: profile.displayName,
      email: profile.emails[0].value,
      hashedPassword: '1234',
      age: 0,
      phone: '12313213',
    };
  }
}
