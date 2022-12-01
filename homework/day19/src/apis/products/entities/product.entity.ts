import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Payment } from 'src/apis/payments/entities/payment.entity';
import { ProductTag } from 'src/apis/productTags/entities/productTag.entity';
import { SubCategory } from 'src/apis/subCategories/entities/subCategory.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  productName: string;

  @Column()
  @Field(() => Int)
  like: number;

  @Column()
  @Field(() => Int)
  price: number;

  @Column()
  @Field(() => Boolean)
  isProduct: boolean;

  @JoinColumn()
  @OneToOne(() => Payment)
  @Field(() => Payment)
  payment: Payment;

  @ManyToOne(() => SubCategory)
  @Field(() => SubCategory)
  subCategory: SubCategory;

  @JoinTable()
  @ManyToMany(() => ProductTag, (productTags) => productTags.products)
  productTags: ProductTag[];
}
