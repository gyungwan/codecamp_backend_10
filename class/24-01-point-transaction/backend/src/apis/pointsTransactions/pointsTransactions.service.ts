import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IAuthUser } from 'src/commons/types/context';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import {
  PointsTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';
import { IPointsTransactionsServiceCreate } from './interfaces/point-transactions-service';

@Injectable()
export class PointsTransactionsService {
  constructor(
    @InjectRepository(PointsTransaction)
    private readonly pointsTransactionRepository: Repository<PointsTransaction>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  async create({
    impUid,
    amount,
    user: _user,
  }: IPointsTransactionsServiceCreate): Promise<PointsTransaction> {
    // this.pointsTransactionRepository.create; // 등록을 위한 빈객체 만들기
    // this.pointsTransactionRepository.insert; //결과는 못받는 등록방법 저장은 하는데 못 돌려받는
    // this.pointsTransactionRepository.update; //저장은 하는데 결과는 못받는 수정 방법

    // 1. PointTransaction 테이블에 거래기록 1줄 생성
    const pointTransaction = this.pointsTransactionRepository.create({
      impUid: impUid,
      amount: amount,
      user: _user,
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });
    //  디비에 저장 save
    await this.pointsTransactionRepository.save(pointTransaction);

    // 2. 유저의 돈 찾아오기
    //임시로 이름을 쓰는거는 언더바를사용 위에 name에 사용
    const user = await this.usersRepository.findOne({
      where: {
        id: _user.id,
      },
    });

    // 3. 유저의 돈 업데이트하기
    //중괄호 두개 들어감 앞쪽에는 조건 뒤에는 바꿀거
    this.usersRepository.update(
      { id: _user.id },
      { point: user.point + amount },
    );

    //4.  최종결과 브라우저에 돌려주기

    return pointTransaction;
  }
}
