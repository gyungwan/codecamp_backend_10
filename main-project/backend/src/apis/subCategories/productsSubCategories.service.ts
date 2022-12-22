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

    @InjectRepository(MainCategory)
    private readonly productsMainRepository: Repository<MainCategory>,
  ) {}

  async create({
    productSubCategoryInput,
  }: IProductsSubCategoriesServiceCreate): Promise<SubCategory> {
    //const { mainCategoryId, ...id } = productSubCategoryInput; 구조분해할당 뒤에 나머지연산자 사용
    const mainCategory = await this.productsMainRepository.findOne({
      where: {
        id: productSubCategoryInput.mainCategoryId,
      },
    });
    const result = await this.productsSubCategoriesRepository.save({
      name: productSubCategoryInput.name,
      mainCategory,
    });
    console.log(result);
    return result;
  }

  async findAll(): Promise<SubCategory[]> {
    return await this.productsSubCategoriesRepository.find();
  }
}
