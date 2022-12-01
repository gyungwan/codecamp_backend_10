import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StarbucksService } from './menus.service';
import { starbucksType } from './entities/starbucks entity';
import { CreateStarbucksInput } from './dto/create-menu.input';
@Resolver()
export class StarbucksResolver {
  constructor(
    private readonly starbucksService: StarbucksService, //
  ) {}

  @Query(() => [starbucksType])
  fetchStarbucks() {
    return this.starbucksService.starbucksMenu();
  }

  @Mutation(() => String)
  createStarbucks(
    @Args('createStarbucksInput') createStarbucksInput: CreateStarbucksInput,
  ) {
    return this.starbucksService.create({ createStarbucksInput });
  }
}
