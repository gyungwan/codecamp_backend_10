import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubCategory } from './entities/subCategory.entity';
import { IProductsSubCategoriesServiceCreate } from './interface/products-subCategory-service.interface';

@Injectable()
export class ProductsSubCategoriesService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly productsSubCategoriesRepository: Repository<SubCategory>,
  ) {}

  create({
    name,
    mainCategory,
  }: IProductsSubCategoriesServiceCreate): Promise<SubCategory> {
    const result = this.productsSubCategoriesRepository.save({
      name,
      mainCategory: {
        id: mainCategory,
      },
    });
    console.log(result);
    return result;
  }

  async findAll(): Promise<SubCategory[]> {
    return await this.productsSubCategoriesRepository.find();
  }
}
