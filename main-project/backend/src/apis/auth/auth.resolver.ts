import {
  CacheTTL,
  CACHE_MANAGER,
  Inject,
  UnauthorizedException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { GqlAuthRefreshGuard } from '../../commons/auth/gql-auth.guard';
import { IUserContext } from 'src/commons/types/context';
import { Cache } from 'cache-manager';
import * as jwt from 'jsonwebtoken';

@Resolver()
export class AuthResolver {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,

    private readonly usersService: UsersService,

    private readonly authService: AuthService,
  ) {}

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  async logout(
    //
    @Context() context: IUserContext,
  ) {
    //console.log('여기서부터RRRRR----', context.req.headers);
    //console.log('여기서부터AAAA=====', context.req.headers.authorization);
    const accessToken = context.req.headers.authorization.replace(
      'Bearer ',
      '',
    );
    const refreshToken = context.req.headers.cookie.replace(
      'refreshToken=',
      '',
    );
    try {
      const decodedA = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY); //이거 물어보기
      const decodedR = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
    } catch (error) {
      throw new UnauthorizedException(error);
    }

    await this.cacheManager.set(
      //여기도 햇갈림
      `accessToken = ${accessToken}`,
      'accessToken',
      3600,
    );
    await this.cacheManager.set(
      `refreshToken=${refreshToken}`,
      'refreshToken',
      3600,
    );

    return '로그아웃 성공';
  }

  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: IUserContext,
  ): Promise<string> {
    console.log(email);
    const user = await this.usersService.findOne({ email });
    console.log(user);
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다');

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다');

    this.authService.setRefreshToken({ user, res: context.res });

    return this.authService.getAccessToken({ user });
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(
    @Context() context: IUserContext, //
  ): string {
    return this.authService.getAccessToken({ user: context.req.user });
  }
}
