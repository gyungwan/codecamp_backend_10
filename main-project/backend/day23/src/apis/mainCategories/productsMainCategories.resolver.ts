import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MainCategory } from './entities/mainCategory.entity';
import { ProductsMainCategoriesService } from './productsMainCategories.service';

@Resolver()
export class ProductsMainCategoriesResolver {
  constructor(
    private readonly productMainCategoriesService: ProductsMainCategoriesService,
  ) {}
  @Mutation(() => MainCategory)
  createProductMainCategory(
    @Args('brand') brand: string, //
  ): Promise<MainCategory> {
    return this.productMainCategoriesService.create({ brand });
  }

  @Query(() => [MainCategory])
  fetchProductsMainCategories(): Promise<MainCategory[]> {
    return this.productMainCategoriesService.findAll();
  }
}
