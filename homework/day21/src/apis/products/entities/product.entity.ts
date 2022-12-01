import { Field, Int, ObjectType } from '@nestjs/graphql';
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

  @ManyToOne(() => SubCategory)
  @Field(() => SubCategory)
  productSubCategory: SubCategory;

  @JoinTable()
  @ManyToMany(() => ProductTag, (productTags) => productTags.products)
  @Field(() => [ProductTag])
  productTags: ProductTag[];

  @DeleteDateColumn()
  @Field(() => Date)
  deleteAt: Date;
}
