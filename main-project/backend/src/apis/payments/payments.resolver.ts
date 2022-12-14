import {
  HttpException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { async } from 'rxjs';
import { IProductContext, IUserContext } from 'src/commons/types/context';
import { Repository } from 'typeorm';
import { GqlAuthAccessGuard } from '../../commons/auth/gql-auth.guard';
import { IamPortService } from '../iamport/iamport.service';
import { Product } from '../products/entities/product.entity';
import { Payment, PAYMENT_STATUS_ENUM } from './entities/payment.entity';
import { PaymentService } from './payments.service';
@Resolver()
export class PaymentResolver {
  constructor(
    private readonly paymentService: PaymentService,

    private readonly iamportService: IamPortService,

    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  // acessToken만 있는 사람만 이용할수 있게 해주는
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Payment) //graphql
  async createPayment(
    @Args('impUid') impUid: string, // 로그인한 유저정보
    @Args({ name: 'amount', type: () => Int }) amount: number, //충전금액 소수로 나올수 있어서 INTtype 적용
    @Context() userContext: IUserContext,
    @Context() productContext: IProductContext,
  ): Promise<Payment> {
    //내가 만든 코드
    //  await this.iamportService.fetchToken(impUid, amount);

    //리뷰영상 코드
    //검증로직
    // 1. 아임포트에 요청해서 결제 완료 기록이 존재하는지 확인한다.

    const token = await this.iamportService.getToken();
    this.iamportService.checkPid({ impUid, token, amount });

    // 2. payment  테이블에는 impUid가 1번만 존재해야 합니다 (중복 결제를 체크)

    this.paymentService.checkDuplicate({ impUid });

    const user = userContext.req.user;
    const product = productContext.req.product;

    // console.log(user);
    // console.log(' product', product);
    return this.paymentService.create({
      impUid,
      amount,
      user,
      product,
    });
  }
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Payment)
  async canclePayment(
    @Args('impUid') impUid: string, // 로그인한 유저정보
    @Args({ name: 'amount', type: () => Int }) amount: number, //
    // @CurrentUser() currentUser : ICurrentUser
    @Context() userContext: IUserContext,
  ): Promise<Payment> {
    const user = userContext.req.user;
    //검증로직들!!

    // 1. 이미 취소된 건인지 확인

    await this.paymentService.checkCanaeled({ impUid });
    // 2.취소하기에 충분한 내 포인트 잔액 남아 있는지

    await this.paymentService.checkCanCelPayment({ impUid, user });
    // 3. 실제로 아임포트에 취소 요청

    const token = await this.iamportService.getToken();
    const canceledAmount = await this.iamportService.cancel({ impUid, token });
    // payment 테이블에 결제 취소 등록
    return await this.paymentService.cancel({
      impUid,
      amount: canceledAmount,
      user,
    });
  }
}
