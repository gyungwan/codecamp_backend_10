import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IAuthUser } from 'src/commons/types/context';
import { DataSource, Repository } from 'typeorm';
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

    private readonly dataSource: DataSource, //
  ) {}
  async create({
    impUid,
    amount,
    user: _user,
  }: IPointsTransactionsServiceCreate): Promise<any> {
    // this.pointsTransactionRepository.create; // 등록을 위한 빈객체 만들기
    // this.pointsTransactionRepository.insert; //결과는 못받는 등록방법 저장은 하는데 못 돌려받는
    // this.pointsTransactionRepository.update; //저장은 하는데 결과는 못받는 수정 방법

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    //데이터베이스에 접속 데이터베이스에 접속하는데 시간이 걸림

    await queryRunner.startTransaction('SERIALIZABLE');
    //  여기서부터 트랙잭션 시작이야 쿼리러너에 계속 저장 커밋하면

    try {
      //여기에 로직이 10줄있다면 하나씩 위에서 실행 만약에 그중에 하나가 에러가 나면 어러난 부분밑으로는 실행을 안하고 캐치부분으로 넘겨짐

      // 1. PointTransaction 테이블에 거래기록 1줄 생성
      const pointTransaction = this.pointsTransactionRepository.create({
        impUid: impUid,
        amount: amount,
        user: _user,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });

      //  디비에 저장 save
      //  await this.pointsTransactionRepository.save(pointTransaction);

      await queryRunner.manager.save(pointTransaction); //queryRunner를 통해서 저장해야만 트랜잭션 먹힘

      //throw new Error('강제로 에러 발생');

      // 2. 유저의 돈 찾아오기
      //임시로 이름을 쓰는거는 언더바를사용 위에 name에 사용
      // const user = await this.usersRepository.findOne({
      //   where: {
      //     id: _user.id,
      //   },
      // });
      const user = await queryRunner.manager.findOne(User, {
        where: { id: _user.id }, //row-lock
        lock: { mode: 'pessimistic_write' },
      });
      //락으로 인해 발생하는 문제가 있을수 있음

      // 3. 유저의 돈 업데이트하기
      //중괄호 두개 들어감 앞쪽에는 조건 뒤에는 바꿀거
      // this.usersRepository.update(
      //   { id: _user.id },
      //   { point: user.point + amount },
      // );
      const updatedUser = this.usersRepository.create({
        ...user,
        point: user.point + amount,
      });

      await queryRunner.manager.save(updatedUser);

      await queryRunner.commitTransaction();
      // 커밋 위에 트랜잭션 끝 지점 다 성공했을때

      //4.  최종결과 브라우저에 돌려주기
      return pointTransaction;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      //성공했든 실패했든 디비랑은 연결 끊기 그래야 다른 사람들이 접속가능?
      await queryRunner.release();
    }
  }
}
