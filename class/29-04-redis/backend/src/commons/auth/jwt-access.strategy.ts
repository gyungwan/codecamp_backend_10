import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      //   jwtFromRequest: (req) => {
      //     console.log(req);
      //     const temp = req.headers.Authorization; // Bearer dfajknfnfa 토큰정보
      //     const accessToken = temp.toLowercase().replace('bearer', '');
      //     return accessToken;
      //   },
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_KEY,
    });
  }

  validate(payload) {
    console.log(payload); // {email: dfa@dsa.com ,sub: fnajfdfa-12321jk}
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
