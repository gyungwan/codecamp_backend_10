import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsSubCategoriesService } from '../subCategories/productsSubCategories.service';
import { SubCategory } from './entities/subCategory.entity';

@Resolver()
export class ProductsSubCategorieseResolver {
  constructor(
    private readonly productsSubCategoriesService: ProductsSubCategoriesService,
  ) {}
  @Mutation(() => SubCategory)
  createProductSubCategory(
    @Args('name') name: string,
    @Args('mainCategory') mainCategory: string, //
  ): Promise<SubCategory> {
    return this.productsSubCategoriesService.create({ name, mainCategory });
  }

  @Query(() => [SubCategory])
  fetchProductsSubCategories(): Promise<SubCategory[]> {
    return this.productsSubCategoriesService.findAll();
  }
}
