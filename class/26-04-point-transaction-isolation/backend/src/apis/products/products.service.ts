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
import { ProductSalesLocation } from '../productsSaleslocations/entities/productSaleslocation.entity';
import { ProductTag } from '../productsTAgs/entities/productTag.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>, //

    @InjectRepository(ProductSalesLocation)
    private readonly productsSaleslocationsRepository: Repository<ProductSalesLocation>,

    @InjectRepository(ProductTag)
    private readonly productTagsRepository: Repository<ProductTag>,
  ) {}
  findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  async create({
    createProductInput,
  }: IProductsServiceCreate): Promise<Product> {
    //1. 상품만 등록하는 경우
    // const result = this.productsRepository.save({
    //   //스프레드연산자로 하며 아래처럼 하나하나 나열하지 않아도 받아올수 있음
    //   ...createProductInput,

    //   //하나하나  직접 나열하는 방식
    //   //     name: createProductInput.name,
    //   //   description: createProductInput.description,
    //   //   price: createProductInput.price,

    //   //   name: '마우스',
    //   //   description: '좋은마우스',
    //   //   price: 3000,
    // });

    //2. 상품과  상품거래위치를 같이 등록하는 경우
    const { productSaleslocation, productCategoryId, productTags, ...product } =
      createProductInput;

    //2-1 상품거래위치 등록
    const result = await this.productsSaleslocationsRepository.save({
      ...productSaleslocation,

      //하나하나 직접 나열하는 방식
      // address:productSaleslocation.address,
      // addressDetail:productSaleslocation.addressDetail,
    });

    //2-2 상품태그 등록
    //      =>상품태그 예시. productTags = ["#전자제품","#영등포", "# 컴퓨터"] 배열에

    const temp = [];
    for (let i = 0; i < productTags.length; i++) {
      const tagname = productTags[i].replace('#', ''); //"전자제품" #이 지워짐

      const prevTag = await this.productTagsRepository.findOne({
        where: { name: tagname },
      });

      //기존에 태그가 존재한다면
      if (prevTag) {
        temp.push(prevTag); //{id:safafsaf-sdad, name:"전자제품"}

        //기존에 태그가 없었다면
      } else {
        const newTag = await this.productTagsRepository.save({
          name: tagname,
        });
        console.log(newTag); //{id:safafsaf-sdad, name:"전자제품"}
        temp.push(newTag);
      }
    }
    //1. 실무에서 반드시 for문 써야하는 경우가 아니면  for문 잘 안씀 => map, forEach 사용
    //2. for 안에서 await를  사용하지 않음  => 안티패턴 (Promise.all로 개선 가능)
    //3. DB에 동일한 패턴 데이터를 반복적으로 등록하지 않음 (네트워크 왔다갔다 비효율)
    console.log(temp); // [{id:dsadasdsa-dsad,name:"전자제품"}.{id:fsafsaf-sfa,name:"영등포"},{}]

    //2-3 상품등록
    const result2 = await this.productsRepository.save({
      ...product,
      productSaleslocation: result, //result 통째로 넣기 vs id만 빼서넣기
      productCategory: {
        id: productCategoryId,
        //  만약에 name까지 받고싶으면 2가지 방법
        // 1) createProductInput에서 카테고리 name까지 받아오기
        // 2) productCategoryId를 사용해서 카테고리 name를 조회하기
      },
      productTags: temp,

      //하나하나 직접나열하는 방식
      // name: product.name,
      // description: product.description,
      // price: product.price,
      // productSaleslocationId: {
      //   id: result.id,
      //   address: result.address,
      //   addressDetail: result.addressDetail,
      // },
    });
    return result2;
  }

  update({ product, updateProductInput }: IProductsServiceUpdate): void {
    //this.productsRepository.create(); //DB 접속이랑 관련없음, 등록을 위해서 빈껍데기 객체를 만들기 위함
    //this.productsRepository.insert() //데이터 등록하기 이것도 마찬가지로 결과를 객체로 못 돌려받는 등록방법
    //this.productsRepository.update() // 결과를 객체로 못 돌려받는 수정방법
    //숙제 :
    //1. 왜 아래 에러가 발생하는지 고민해보기
    //2. 아래 에러 고쳐보기
    // const result = this.productsRepository.save({
    //   //id 값이 있다면 그건 수정 그 id값에 맞는 내용들을 수정해서 저장
    //   ...product, //수정 후 수정되지 않은 다른 결과값까지 모두 받고 싶을때 사용
    //   // id: productId,
    //   ...updateProductInput,
    //   // name: updateProductInput.name,
    //   // price: updateProductInput.price,
    //   // description: updateProductInput.description,
    // });
    // return result;
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
