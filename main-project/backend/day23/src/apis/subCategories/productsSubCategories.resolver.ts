import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MainCategory } from '../mainCategories/entities/mainCategory.entity';
import { ProductsSubCategoriesService } from '../subCategories/productsSubCategories.service';
import { ProductSubCategoryInput } from './dto/product-sub-category.input';
import { SubCategory } from './entities/subCategory.entity';

@Resolver()
export class ProductsSubCategorieseResolver {
  constructor(
    private readonly productsSubCategoriesService: ProductsSubCategoriesService,
  ) {}
  @Mutation(() => SubCategory)
  createProductSubCategory(
    @Args('productSubCategoryInput')
    productSubCategoryInput: ProductSubCategoryInput,
    // @Args('name') name: string,
    // @Args('mainCategory') mainCategory: string, //
  ): Promise<SubCategory> {
    return this.productsSubCategoriesService.create({
      productSubCategoryInput,
    });
  }

  @Query(() => [SubCategory])
  fetchProductsSubCategories(): Promise<SubCategory[]> {
    return this.productsSubCategoriesService.findAll();
  }
}
