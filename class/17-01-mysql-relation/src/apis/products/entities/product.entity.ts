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

@Entity() //클래스가 실행될때 tyoeorm에 의해 entity테이블을 만들어 줍니다 
export class Product {
  @PrimaryGeneratedColumn('uuid') //id 컬럼이 만들어지면서 자동으로 값 생성  uuid => 고유한 pk키를 생성, increment => 숫자가 하나씩 올라가는 PK키를 생성 
  id: string;

  @Column() //ERD에서 타입을 지정해주었는데 entity에서 타입을 원하는대로 지정 해 줄수 있다 정해주지 않고 빈괄호로 두면 default 값으로 들어가게 됩니다.
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
