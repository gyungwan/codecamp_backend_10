import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository, TypeOrmDataSourceFactory } from '@nestjs/typeorm';
import { throws } from 'assert';
import axios from 'axios';
import { UniqueArgumentDefinitionNamesRule } from 'graphql';
import { throwError } from 'rxjs';
import { DataSource, Repository } from 'typeorm';
import { IamPortService } from '../iamport/iamport.service';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { Payment, PAYMENT_STATUS_ENUM } from './entities/payment.entity';
import { IPaymentServiceCreate } from './interface/payment.interface';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Payment)
    private readonly productRepository: Repository<Product>,

    private readonly iamPortService: IamPortService,

    private readonly dataSource: DataSource,
  ) {}

  async checkDuplicate({ impUid }) {
    const result = await this.paymentRepository.findOne({ where: { impUid } });

    if (result) throw new ConflictException('이미 결제된 아이디입니다.');
  }

  async checkCanaeled({ impUid }) {
    const paymentStatus = await this.paymentRepository.findOne({
      where: {
        impUid,
        status: PAYMENT_STATUS_ENUM.CANCEL,
      },
    });
    if (paymentStatus) throw new ConflictException('이미취소된 결제 입니다');
  }

  //결제취소 할 수 있는 잔액화인
  async checkCanCelPayment({ impUid, user }) {
    const paymentCheck = await this.paymentRepository.findOne({
      where: {
        impUid,
        user: { id: user.id },
        status: PAYMENT_STATUS_ENUM.PAYMENT,
      },
    });
    if (!paymentCheck)
      throw new UnprocessableEntityException('결제 기록이 존재하지 않습니다.');

    const User = await this.usersRepository.findOne({ where: { id: user.id } });
    if (User.payment < paymentCheck.amount)
      throw new UnprocessableEntityException('결제금액이 부족합니다');
  }

  async cancel({ impUid, amount, user }) {
    const result = await this.create({
      impUid,
      amount: -amount,
      user,
      status: PAYMENT_STATUS_ENUM.CANCEL,
    });
    return result;
  }

  async create({
    impUid,
    amount,
    user: _user, //
    product,
    status = PAYMENT_STATUS_ENUM.PAYMENT,
  }: IPaymentServiceCreate): Promise<Payment> {
    //
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction('SERIALIZABLE');

    const payment = this.paymentRepository.create({
      impUid,
      amount,
      user: _user,
      status,
      product,
    });

    try {
      const result = await queryRunner.manager.save(payment);

      // console.log('id' + _user.id);
      const user = await queryRunner.manager.findOne(User, {
        where: { id: _user.id },
        lock: { mode: 'pessimistic_write' },
      });
      // console.log('user' + user);
      await queryRunner.manager.update(
        User,
        { id: _user.id },
        { payment: user.payment + amount },
      );

      await queryRunner.commitTransaction();

      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
