import { Payment } from 'src/apis/payments/entities/payment.entity';
import { SubCategory } from 'src/apis/subCategories/entities/subCategory.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productName: string;

  @Column()
  like: number;

  @Column()
  price: number;

  @JoinColumn()
  @OneToOne(() => Payment)
  payment: Payment;

  @ManyToOne(() => SubCategory)
  subCategory: SubCategory;
}
