import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategory } from './entities/subCategory.entity';
import { ProductsSubCategorieseResolver } from './productsSubCategories.resolver';
import { ProductsSubCategoriesService } from './productsSubCategories.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SubCategory, //
    ]),
  ],
  providers: [
    ProductsSubCategorieseResolver, //
    ProductsSubCategoriesService,
  ],
})
export class ProductsSubCategoriesModule {}
