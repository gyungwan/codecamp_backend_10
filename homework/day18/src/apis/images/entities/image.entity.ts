import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  imgUrl: string;

  @Column()
  imgMain: boolean;

  @ManyToOne(() => Product)
  product: Product;
}
