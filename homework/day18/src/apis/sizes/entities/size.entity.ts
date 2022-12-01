import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Size {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  size: string;

  @ManyToOne(() => Product)
  product: Product;
}
