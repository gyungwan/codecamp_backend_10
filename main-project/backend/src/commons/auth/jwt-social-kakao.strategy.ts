import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao'; //yarn add kakao설치

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    //kakao strategy로 바뀜
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/kakao',
      scope: ['account_email', 'profile_nickname'],
    });
  }

  validate(accessToken, refreshToken, profile) {
    console.log(accessToken),
      console.log(refreshToken),
      console.log('--------------------'),
      console.log(profile);

    return {
      name: profile.displayName,
      nickname: profile._json.kakao_account.profile_needs_agreement,
      email: profile._json.kakao_account.email
        ? profile._json.kakao_account.email
        : '',
      hashedPassword: '1234',
      age: 0,
      phone: '12313213',
    };
  }
}
