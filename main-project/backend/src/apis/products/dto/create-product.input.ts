import { Field, InputType, Int } from '@nestjs/graphql';
import { ProductImageInput } from 'src/apis/images/dto/product-image.input';
//ㅣimport { ProductSizeInput } from 'src/apis/sizes/dto/product-size.input';
import { ProductSubCategoryInput } from 'src/apis/subCategories/dto/product-sub-category.input';
import { PRODUCT_SIZE_ENUM } from '../entities/product.entity';

@InputType() // 오브젝트 타입을 인풋타입으로 쓰겠다
export class CreateProductInput {
  @Field(() => String)
  productName: string;

  @Field(() => Int)
  like: number;

  @Field(() => Int)
  price: number;

  @Field(() => Boolean)
  isProduct: boolean;

  @Field(() => PRODUCT_SIZE_ENUM)
  size: string;

  @Field(() => String)
  productSubCategoryId: string;

  @Field(() => [String])
  productTags: string[];

  @Field(() => [String])
  imgUrls: string[];
}
