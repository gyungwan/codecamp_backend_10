import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductCategory } from './entities/product.Category.entity';
import { ProductsCategoriesService } from './productsCategories.service';

@Resolver()
export class ProductsCategoriesResolver {
  constructor(
    private readonly productsCategoriesService: ProductsCategoriesService,
  ) {}

  @Mutation(() => ProductCategory)
  createProductCategory(
    @Args('name') name: string, //
  ): Promise<ProductCategory> {
    //브라우저에 결과 보내는 2가지 방법

    //1. 저장된객체 그대로 돌려부내주기 => 브라우저에서 프론트엔드 개발자분이 임시저장(캐시) 해놓을 수 있음
    return this.productsCategoriesService.create({ name });

    //2. 결과 메세지만 보내주기
    //return " 정상적으로 카테고리가 생성되었습니다"
  }
}
