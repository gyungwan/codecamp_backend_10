import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/google',
      scope: ['email', 'profile'],
      //   secretOrKey: process.env.JWT_ACCESS_KEY,
    });
  }

  //구글로부터 받아오는 데터가 porfile안에 담겨져있음
  validate(accessToken, refreshToken, profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    //profile  안에 있는걸 하나하나 열어서 return으로 넘겨주게 되면 우리가 최종적으로 authcontriller부분에서 확인할수 있다
    return {
      name: profile.displayName,
      email: profile.emails[0].value,
      hashedPassword: '1234',
      age: 0,
      phone: '12313213',
    };
  }
}
