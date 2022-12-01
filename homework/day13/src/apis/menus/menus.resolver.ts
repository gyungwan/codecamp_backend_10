import { Query, Resolver } from '@nestjs/graphql';
import { StarbucksService } from './menus.service';
import { starbucksType } from './menus.model';
@Resolver()
export class StarbucksResolver {
  constructor(
    private readonly starbucksService: StarbucksService, //
  ) {}

  @Query(() => [starbucksType])
  fetchStarbucks() {
    return this.starbucksService.starbucksMenu();
  }
}
