import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { image } from '../images/entities/image.entity';
import { ProductLike } from '../Like/entities/like.entity';
import { ProductTag } from '../productTags/entities/productTag.entity';
//import { Size } from '../sizes/entities/size.entity';
import { SubCategory } from '../subCategories/entities/subCategory.entity';
import { Product } from './entities/product.entity';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      SubCategory,
      image,
      //Size,
      ProductTag,
      ProductLike,
      //
    ]),
  ],
  providers: [
    ProductsResolver, //
    ProductsService,
  ],
})
export class ProductsModule {}
