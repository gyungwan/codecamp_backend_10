import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MainCategory } from '../mainCategories/entities/mainCategory.entity';
import { SubCategory } from './entities/subCategory.entity';
import { IProductsSubCategoriesServiceCreate } from './interface/products-subCategory-service.interface';

@Injectable()
export class ProductsSubCategoriesService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly productsSubCategoriesRepository: Repository<SubCategory>,
  ) {}

  async create({
    productSubCategoryInput,
  }: IProductsSubCategoriesServiceCreate): Promise<SubCategory> {
    const result = await this.productsSubCategoriesRepository.save({
      ...productSubCategoryInput,
    });
    console.log(result);
    return result;
  }

  async findAll(): Promise<SubCategory[]> {
    return await this.productsSubCategoriesRepository.find();
  }
}
