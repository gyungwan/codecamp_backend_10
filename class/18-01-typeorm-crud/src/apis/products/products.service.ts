import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IproductsServiceCheckSoldout,
  IProductsServiceCreate,
  IProductsServiceFindOne,
  IProductsServiceUpdate,
} from './interfaces/products-service.interface';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>, //
  ) {}
  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({ where: { id: productId } });
  }

  create({ createProductInput }: IProductsServiceCreate): Promise<Product> {
    const result = this.productsRepository.save({
      //스프레드연산자로 하며 아래처럼 하나하나 나열하지 않아도 받아올수 있음
      ...createProductInput,

      //하나하나  직접 나열하는 방식
      //     name: createProductInput.name,
      //   description: createProductInput.description,
      //   price: createProductInput.price,

      //   name: '마우스',
      //   description: '좋은마우스',
      //   price: 3000,
    });

    return result;

    // 디비에저장후 result 안에 무엇이 있을까?
    //{
    //     id : 'sfnaosnifsf',
    //     name: '마우스',
    //     description: '좋은마우스',
    //     price: 3000}
  }

  update({
    product,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<Product> {
    //this.productsRepository.create(); //DB 접속이랑 관련없음, 등록을 위해서 빈껍데기 객체를 만들기 위함
    //this.productsRepository.insert() //데이터 등록하기 이것도 마찬가지로 결과를 객체로 못 돌려받는 등록방법
    //this.productsRepository.update() // 결과를 객체로 못 돌려받는 수정방법

    const result = this.productsRepository.save({
      //id 값이 있다면 그건 수정 그 id값에 맞는 내용들을 수정해서 저장
      ...product, //수정 후 수정되지 않은 다른 결과값까지 모두 받고 싶을때 사용
      // id: productId,
      ...updateProductInput,
      // name: updateProductInput.name,
      // price: updateProductInput.price,
      // description: updateProductInput.description,
    });
    return result;
  }

  checkSoldout({ product }: IproductsServiceCheckSoldout): void {
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매완료된 상품입니다.');
    }

    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }
}
