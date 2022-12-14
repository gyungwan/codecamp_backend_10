import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { image } from '../images/entities/image.entity';
import { ProductLike } from '../Like/entities/like.entity';
import { ProductTag } from '../productTags/entities/productTag.entity';
//import { Size } from '../sizes/entities/size.entity';
import { SubCategory } from '../subCategories/entities/subCategory.entity';
import { Product, PRODUCT_SIZE_ENUM } from './entities/product.entity';
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

    // @InjectRepository(Size)
    // private readonly productsSizeRepository: Repository<Size>,

    @InjectRepository(ProductTag)
    private readonly productsTagsRepository: Repository<ProductTag>,

    @InjectRepository(ProductLike)
    private readonly productLike: Repository<ProductLike>,
  ) {}

  async create({ createProductInput }: IProductsServiceCreate) {
    const {
      productSubCategoryId,
      // productImage,
      productTags,
      imgUrls,
      ...product //레스트
    } = createProductInput;

    console.log(productSubCategoryId);
    const category = await this.productsSubCategoryRepository.findOne({
      where: {
        id: productSubCategoryId,
      },
    });

    // 태그
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

    if (product.size === 'S') {
      product.size = PRODUCT_SIZE_ENUM.S;
    } else if (product.size === 'M') {
      product.size = PRODUCT_SIZE_ENUM.M;
    } else if (product.size === 'L') {
      product.size = PRODUCT_SIZE_ENUM.L;
    } else if (product.size === 'XL') {
      product.size = PRODUCT_SIZE_ENUM.XL;
    }

    const result = await this.productsRepository.save({
      ...product, //스프레드 하나하나풀어주는거
      productSubCategory: category,

      //productImage: { id: image },

      // productSize: { ...size },

      productTags: temp,
    });
    console.log(result);

    // const size = await this.productsSizeRepository.save({
    //   size: productSize,
    //   product: { ...result },
    // });

    await Promise.all(
      imgUrls.map((el, i) => {
        this.productsImageRepository.save({
          imageUrl: el,
          isMain: i === 0 ? true : false,
          product: {
            ...result,
          },
        });
      }),
    );

    // const image = await this.productsImageRepository.save({
    //   ...productImage,
    //   product: { ...result },
    // });

    return result;
  }

  update({ product, updateProductInput }) {
    const result = this.productsRepository.save({
      ...product,
      ...updateProductInput,
    });
    return result;
  }

  //토큰이랑 상품아이디 받아서 한유저당 한번씩만 데이터 쌓이게
  LikeUpdate({ id, user }) {}

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
