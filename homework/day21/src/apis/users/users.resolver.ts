import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  @Mutation(() => User)
  async createUser(
    @Args('name') name: string,
    @Args('phone') phone: string,
    @Args('email') email: string,
    @Args('userId') userId: string,
    @Args('password') password: string,
  ): Promise<User> {
    const hashedpassword = await bcrypt.hash(password, 10);
    return this.usersService.create({
      name,
      phone,
      email,
      userId,
      hashedpassword,
    });
  }

  @Mutation(() => User)
  async updateUsers(
    @Args('userid') userid: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    const user = await this.usersService.findOne({ userid });
    console.log(user);
    return this.usersService.update({ user, updateUserInput });
  }

  @Query(() => [User])
  fetchUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @Query(() => User)
  fetchUser(@Args('userid') userid: string): Promise<User> {
    return this.usersService.findOne({ userid });
  }

  @Mutation(() => Boolean)
  deleteUser(
    @Args('userid') userid: string, //
  ): Promise<boolean> {
    return this.usersService.delte({ userid });
  }
}
