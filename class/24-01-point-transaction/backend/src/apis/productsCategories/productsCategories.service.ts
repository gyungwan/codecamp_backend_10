import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/product.Category.entity';
import { IProductsCategoriesServiceCreate } from './interfaces/products-categories-service.interface';

@Injectable()
export class ProductsCategoriesService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productsCategoriesRepository: Repository<ProductCategory>,
  ) {}

  create({ name }: IProductsCategoriesServiceCreate): Promise<ProductCategory> {
    //여기서는 DB에 카테고리 등록

    const result = this.productsCategoriesRepository.save({ name });
    return result;
  }
}
