import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MainCategory } from './entities/mainCategory.entity';
import { IProductsMainCategoriesServiceCreate } from './interface/products-mainCategory-service.interface';

@Injectable()
export class ProductsMainCategoriesService {
  constructor(
    @InjectRepository(MainCategory)
    private readonly productsMainCategoriesRepository: Repository<MainCategory>,
  ) {}

  create({
    brand,
  }: IProductsMainCategoriesServiceCreate): Promise<MainCategory> {
    const result = this.productsMainCategoriesRepository.save({ brand });
    return result;
  }

  async findAll(): Promise<MainCategory[]> {
    return await this.productsMainCategoriesRepository.find();
  }
}
