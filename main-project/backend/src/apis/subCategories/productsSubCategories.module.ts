import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainCategory } from '../mainCategories/entities/mainCategory.entity';
import { SubCategory } from './entities/subCategory.entity';
import { ProductsSubCategorieseResolver } from './productsSubCategories.resolver';
import { ProductsSubCategoriesService } from './productsSubCategories.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SubCategory, //
      MainCategory,
    ]),
  ],
  providers: [
    ProductsSubCategorieseResolver, //
    ProductsSubCategoriesService,
  ],
})
export class ProductsSubCategoriesModule {}
