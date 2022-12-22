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
  IProductsServiceUpdate,
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
    private readonly productLikeRepositry: Repository<ProductLike>,
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
      relations: ['mainCategory'],
    });
    // console.log('=================================', category);

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

  async update({
    product,
    updateProductInput,
    imgUrls,
  }: IProductsServiceUpdate): Promise<Product> {
    // const result = await this.productsRepository.save({
    //   ...product,
    //   ...updateProductInput,
    //   ...imgUrls,
    // });
    // return result;

    const { productSubCategoryId, productTags, ...products } =
      updateProductInput;

    const getProductId = await this.productsImageRepository.find({
      where: {
        product,
      },
      relations: ['product'], //받아온 productid로 이미지저장소에서 해당하는 productid가 있는 열의 데이터를 받아옴 where 찾아오는 조건
    });

    if (getProductId) {
      await Promise.all(
        getProductId.map((el) => {
          this.productsImageRepository.delete(el.id);
        }),
      );
    }
    console.log(imgUrls);
    await Promise.all(
      imgUrls.map((el, i) => {
        this.productsImageRepository.save({
          imgUrl: el,
          isMain: i === 0 ? true : false,
          product: {
            ...product,
          },
        });
      }),
    );
    const temp = [];
    if (productTags) {
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
    }

    const result = await this.productsRepository.save({
      ...product,
      productSubCategoryId,
      productTags: temp,
      ...products,
    });
    return result;
  }

  //토큰이랑 상품아이디 받아서 한유저당 한번씩만 데이터 쌓이게
  async LikeUpdate({ productid, email }) {
    //findone
    const getEmail = await this.productLikeRepositry.findOne({
      where: { email },
    });

    if (getEmail) {
      return '에러던지기11111';
    }
    return this.productLikeRepositry.save({
      productid,
      email,
    });

    //저장
  }

  async likeFind({ email }) {
    //받아온 카운트를 여기서 0으로 하고 하나씩 더한 숫자를 ?
    const total = await this.productLikeRepositry.find({
      where: { email: email },
    });
    console.log('==========user', total);
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
