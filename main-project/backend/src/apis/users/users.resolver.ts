import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlAuthAccessGuard } from '../../commons/auth/gql-auth.guard';
import { IUserContext } from 'src/commons/types/context';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  @Mutation(() => User)
  async createUser(
    @Args('name') name: string,
    @Args('phone') phone: string,
    @Args('email') email: string,
    // @Args('userId') userId: string,
    @Args('password') password: string,
    @Args('age') age: number,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.create({
      name,
      phone,
      email,
      // userId,
      hashedPassword,
      age,
    });
  }

  @Mutation(() => User)
  async updateUsers(
    @Args('email') email: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    const user = await this.usersService.findOne({ email });
    console.log(user);
    return this.usersService.update({ user, updateUserInput });
  }

  @Query(() => [User])
  fetchUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User)
  fetchUser(@Args('email') email: string): Promise<User> {
    return this.usersService.findOne({ email });
  }

  @Mutation(() => Boolean)
  deleteUser(
    @Args('email') email: string, //
  ): Promise<boolean> {
    return this.usersService.delte({ email });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  fetchLoginUser(@Context() context: IUserContext) {
    console.log(context.req.user);
    return this.usersService.findLogin({ context });
  }
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async updateLoginUser(
    @Context() context: IUserContext,
    @Args('password') password: string,
  ) {
    console.log(context.req.user.email);
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = await this.usersRepository.findOne({
      where: {
        email: context.req.user.email,
      },
    });
    return this.usersService.updateLoginUser({ user, hashedpassword });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deletLoginUser(@Context() context: IUserContext) {
    return this.usersService.deleteLogin({ context });
  }
}
