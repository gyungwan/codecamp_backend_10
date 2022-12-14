import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainCategory } from './entities/mainCategory.entity';
import { ProductsMainCategoriesResolver } from './productsMainCategories.resolver';
import { ProductsMainCategoriesService } from './productsMainCategories.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MainCategory, //
    ]),
  ],
  providers: [ProductsMainCategoriesResolver, ProductsMainCategoriesService],
})
export class ProductsMainCategoriesModule {}
