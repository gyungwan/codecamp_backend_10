import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //
      secretOrKey: process.env.JWT_ACCESS_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req, payload) {
    //지금 통과한 그 토큰이 혹시 로그아웃 된건 아냐 여기서 레디스 갔다오기 만료시간 설정해서 그 시간만 저장
    //여기 없으면 로그아웃한 사람 아냐 해서 리턴 정상적인
    //로그아웃한 사람이면 에러던지기
    console.log(req.headers);
    const accessToken = req.headers.authorization.replace('Bearer ', '');
    const chechAccess = await this.cacheManager.get(
      `accessToken = ${accessToken}`,
    );
    //console.log(payload);

    if (chechAccess) {
      throw new UnauthorizedException();
    }

    return {
      email: payload.email,
      id: payload.sub,
      exp: payload.exp,
    };
  }
}
