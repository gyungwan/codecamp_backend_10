import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductLike {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //필드
  @Column()
  @Field(() => String)
  // @ManyToOne(() => String)
  email: string;

  @Column()
  @Field(() => String)
  // @ManyToOne(() => String)
  productid: string;
}
