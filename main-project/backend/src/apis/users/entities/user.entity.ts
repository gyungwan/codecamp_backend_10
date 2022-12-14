import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  phone: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => Int)
  age: number;

  // @Column()
  // @Field(() => String)
  // userId: string;

  @Column()
  // @Field(() => String)
  password: string;

  // @Column({ default: '뉴비' })
  // @Field(() => String)
  // grade: string;

  @DeleteDateColumn() //데이터 소프트 삭제시(그냥삭제는 진짜 없어짐) 자동으로 소프트 삭제시간 자동으로 추가
  @Field(() => Date)
  deleteAt: Date;

  @Column({ default: 0 })
  @Field(() => Int)
  payment: number;
}
