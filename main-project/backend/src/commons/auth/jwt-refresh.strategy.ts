import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: (req) => {
        console.log(req);
        const Cookie = req.headers.cookie; //
        const refreshToken = Cookie.replace('refreshToken=', '');

        return refreshToken;
      },
      secretOrKey: process.env.JWT_REFRESH_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req, payload) {
    //console.log(' 여깅 ===============', req.headers);
    const refreshToken = req.headers.cookie.replace('refreshToken=', '');
    const chechRefresh = await this.cacheManager.get(
      `refreshToken=${refreshToken}`,
    );
    //console.log(payload);

    if (chechRefresh) {
      throw new UnauthorizedException();
    }
    return {
      email: payload.email,
      id: payload.sub,
      exp: payload.exp,
    };
  }
}
