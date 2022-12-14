import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ProductTag } from 'src/apis/productTags/entities/productTag.entity';
import { SubCategory } from 'src/apis/subCategories/entities/subCategory.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum PRODUCT_SIZE_ENUM {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
}

registerEnumType(PRODUCT_SIZE_ENUM, {
  name: 'PRODUCT_SIZE_ENUM',
});

@Entity()
@ObjectType() //그래프큐엘에 저장할때 객체로
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  productName: string;

  @Column({ default: 0 })
  @Field(() => Int)
  like: number;

  @Column()
  @Field(() => Int)
  price: number;

  @Column({ default: false })
  @Field(() => Boolean)
  isProduct: boolean;

  @ManyToOne(() => SubCategory)
  @Field(() => SubCategory)
  productSubCategory: SubCategory;

  @JoinTable()
  @ManyToMany(() => ProductTag, (productTags) => productTags.products)
  @Field(() => [ProductTag])
  productTags: ProductTag[];

  @Column({ type: 'enum', enum: PRODUCT_SIZE_ENUM })
  @Field(() => PRODUCT_SIZE_ENUM)
  size: string;

  @DeleteDateColumn()
  @Field(() => Date)
  deleteAt: Date;
}
