import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { image } from '../images/entities/image.entity';
import { ProductTag } from '../productTags/entities/productTag.entity';
import { Size } from '../sizes/entities/size.entity';
import { SubCategory } from '../subCategories/entities/subCategory.entity';
import { Product } from './entities/product.entity';
import {
  IProductsServiceCreate,
  IProductsServiceDelete,
  IProductsServiceFindOne,
} from './interface/products-service.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,

    @InjectRepository(SubCategory)
    private readonly productsSubCategoryRepository: Repository<SubCategory>,

    @InjectRepository(image)
    private readonly productsImageRepository: Repository<image>,

    @InjectRepository(Size)
    private readonly productsSizeRepository: Repository<Size>,

    @InjectRepository(ProductTag)
    private readonly productsTagsRepository: Repository<ProductTag>,
  ) {}

  async create({ createProductInput }: IProductsServiceCreate) {
    const {
      productSubCategoryId,
      productImage,
      productSize,
      productTags,
      ...product
    } = createProductInput;

    console.log(productSubCategoryId);
    const category = await this.productsSubCategoryRepository.findOne({
      where: {
        id: productSubCategoryId,
      },
    });

    const temp = [];
    for (let i = 0; i < productTags.length; i++) {
      const tagname = productTags[i].replace('#', '');

      const prevTag = await this.productsTagsRepository.findOne({
        where: { name: tagname },
      });

      if (prevTag) {
        temp.push(prevTag);
      } else {
        const newTag = await this.productsTagsRepository.save({
          name: tagname,
        });
        temp.push(newTag);
      }
    }

    const result = await this.productsRepository.save({
      ...product,
      productSubCategory: category,
      //productImage: { id: image },
      //productSize: { ...size },
      productTags: temp,
    });
    console.log(result);

    const size = await this.productsSizeRepository.save({
      size: productSize,
      product: { ...result },
    });
    const image = await this.productsImageRepository.save({
      ...productImage,
      product: { ...result },
    });
    return result;
  }

  update({ product, updateProductInput }) {
    const result = this.productsRepository.save({
      ...product,
      ...updateProductInput,
    });
    return result;
  }

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({ relations: [''] });
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({ where: { id: productId } });
  }

  async delete({ productId }: IProductsServiceDelete): Promise<boolean> {
    const result = await this.productsRepository.softDelete({ id: productId });

    return result.affected ? true : false;
  }
  findDeletedAll(): Promise<Product[]> {
    return this.productsRepository.find({ withDeleted: true });
  }
  async restore({ productId }): Promise<boolean> {
    const result = await this.productsRepository.restore({ id: productId });

    return result.affected ? true : false;
  }
}
