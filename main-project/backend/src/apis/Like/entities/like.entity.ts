import { Product } from 'src/apis/products/entities/product.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductLike {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 0 })
  liike: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Product)
  protuct: Product;
}
