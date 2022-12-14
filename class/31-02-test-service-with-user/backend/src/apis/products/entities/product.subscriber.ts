import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Product } from './product.entity';

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Product;
  }
  //디비 프로덕트에 저장하고 나서 실행되게해주는
  afterInsert(event: InsertEvent<any>): void | Promise<any> {
    console.log(event); //event.entity.price, event.entity.isDoldout, ....

    const id = event.entity.id;
    const name = event.entity.name;
    const description = event.entity.description;
    const price = event.entity.price;
    const isSoldout = event.entity.isSoldout;

    console.log(`${id} ${name} ${description} ${price} ${isSoldout}`); //빅쿼리나 엘라스틱서치에 담기

    // 1. 크리거는 언제 사용하면 안될까?
    //트랜잭션 연결된 중요한 내용들

    // 2. 어떤 것들을 사용하면 좋을까
    // 메인 로직에 큰 피해를 안끼치는 로직들.....(통계 계산하기, 로그 쌓아놓기) 프로덕트 테이블에 구매하고 그사람이 구매하면 매출액을 계산해서 촘 애출액을 얄려주기
    //데이버베이스의 규모가 커지면 이 통계 작업을 하게뫼면 오래 걸려서 따로 테이블을 만들어서
  }
}
