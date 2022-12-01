import { UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { IContext } from 'src/commons/types/context';
import { GqlAuthRefreshGuard } from '../common/auth/gql-auth.guard';
@Resolver()
export class AuthResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: IContext,
  ): Promise<string> {
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
    @Context() context: IContext, //
  ): string {
    return this.authService.getAccessToken({ user: context.req.user });
  }
}
