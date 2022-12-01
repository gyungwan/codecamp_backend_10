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
  IProductsServiceDelete,
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

  async delete({ productId }: IProductsServiceDelete): Promise<boolean> {
    // 1. 실제 삭제

    // const result = await this.productsRepository.delete({ id: productId });

    // return result.affected ? true : false;

    //2. 소프트 삭제(직접구현) - isDeleted
    // this.productsRepository.update({id:productId},{isDelete:true})

    //3. 소프트 삭제(직접구현)- deletedAt 실무에서 많이 사용 삭제칸이 비워줘있다가  삭제하면 그 칸에 삭제된 시간을 저장
    // this.productsRepository.update(
    //   { id: productId },
    //   { deletedAt: new Date() });

    //4. 소프츠 삭제 (Typeorm 제공) - softReomve
    // this.productsRepository.softRemove({ id: productId }); // id로만 삭제가능

    //5.소프츠 삭제 (Typeorm 제공) - softDelete
    const result = await this.productsRepository.softDelete({ id: productId }); // 다른 컬럼으로도 삭제 가능

    return result.affected ? true : false;
  }
}
