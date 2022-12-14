import { InputType, OmitType, PartialType, PickType } from '@nestjs/graphql';
import { CreateProductInput } from './create-product.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  //   name: string;
  //   description: string;
  //   price: number;
}

// 네임과 프라이스만 골라진 타입을 만들어줄수 있음
// PickType(CreateProductInput,["name","price"])

// OmitType(CreateProductInput,["description"]) //디스크립션 빼고 타입을 만들어내기

// PickType(CreateProductInput)  있어도 되고 없어도 되고
