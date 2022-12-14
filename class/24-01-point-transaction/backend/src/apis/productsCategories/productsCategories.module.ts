import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './entities/product.Category.entity';
import { ProductsCategoriesService } from './productsCategories.service';
import { ProductsCategoriesResolver } from './productsCategories.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductCategory, //
    ]),
  ],
  providers: [
    ProductsCategoriesResolver, //
    ProductsCategoriesService,
  ],
})
export class ProductsCategoriesModule {}
