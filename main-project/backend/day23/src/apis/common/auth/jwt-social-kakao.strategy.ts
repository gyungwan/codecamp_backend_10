import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      //   clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/kakao',
      //   scope: ['email', 'profile'],
    });
  }

  validate(accessToken, refreshToken, profile) {
    console.log(accessToken),
      console.log(refreshToken),
      console.log('--------------------'),
      console.log(profile);

    return {
      name: profile.username,
      email: profile._json.kakao_account.email,
      hashedPassword: '1234',
      age: 0,
      phone: '12313213',
    };
  }
}
