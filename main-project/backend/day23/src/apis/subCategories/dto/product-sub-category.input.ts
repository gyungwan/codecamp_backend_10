import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { MainCategory } from 'src/apis/mainCategories/entities/mainCategory.entity';
import { SubCategory } from '../entities/subCategory.entity';

@InputType()
export class ProductSubCategoryInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  mainCategoryId: string;
}

// extends PartialType(SubCategory) {}
