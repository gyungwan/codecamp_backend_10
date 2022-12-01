import { ProductCategory } from 'src/apis/productsCategories/entities/product.Category.entity';
import { ProductSalesLocation } from 'src/apis/productsSaleslocations/entities/productSaleslocation.entity';
import { ProductTag } from 'src/apis/productsTAgs/entities/productTag.entity';
import { User } from 'src/apis/users/entities/user.entity';
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
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  descripting: string;

  @Column()
  price: number;

  @Column()
  isSoldout: boolean;

  @ManyToOne(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  user: User;

  @JoinColumn()
  @OneToOne(() => ProductSalesLocation)
  productSaleslocation: ProductSalesLocation;

  @JoinTable()
  @ManyToMany(() => ProductTag, (productTags) => productTags.products)
  productTags: ProductTag[];
}
