import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  phone: number;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  userId: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column({ default: '뉴비' })
  @Field(() => String)
  grade: string;
}
