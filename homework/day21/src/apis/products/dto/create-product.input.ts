import { Field, InputType, Int } from '@nestjs/graphql';
import { ProductImageInput } from 'src/apis/images/dto/product-image.input';
import { ProductSizeInput } from 'src/apis/sizes/dto/product-size.input';
import { ProductSubCategoryInput } from 'src/apis/subCategories/dto/product-sub-category.input';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  productName: string;

  @Field(() => Int)
  like: number;

  @Field(() => Int)
  price: number;

  @Field(() => Boolean)
  isProduct: boolean;

  @Field(() => String)
  productSubCategory: string;

  @Field(() => String)
  productImage: string;

  @Field(() => String)
  productSize: string;

  @Field(() => [String])
  productTags: string[];
}
