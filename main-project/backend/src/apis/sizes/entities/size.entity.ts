// import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
// import { Product } from 'src/apis/products/entities/product.entity';
// import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// export enum PRODUCT_SIZE_ENUM {
//   S = 'S',
//   M = 'M',
//   L = 'L',
//   XL = 'XL',
// }

// registerEnumType(PRODUCT_SIZE_ENUM, {
//   name: 'PRODUCT_SIZE_ENUM',
// });

// @Entity()
// @ObjectType()
// export class Size {
//   @PrimaryGeneratedColumn('uuid')
//   @Field(() => String)
//   id: string;

//   //enum

//   @ManyToOne(() => Product)
//   @Field(() => Product)
//   product: Product;
// }
