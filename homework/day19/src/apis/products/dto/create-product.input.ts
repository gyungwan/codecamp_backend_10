import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  productName: string;

  @Field(() => Int)
  like: number;

  @Field(() => Int)
  price: number;

  @Field(() => String)
  grade: string;
}
