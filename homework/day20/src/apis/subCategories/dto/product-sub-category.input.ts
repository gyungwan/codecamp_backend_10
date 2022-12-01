import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { SubCategory } from '../entities/subCategory.entity';

@InputType()
export class ProductSubCategoryInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  mainCategory: string;
}

// extends PartialType(SubCategory) {}
