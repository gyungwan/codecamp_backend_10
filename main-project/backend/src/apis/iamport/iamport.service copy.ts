// import {
//   ConflictException,
//   Injectable,
//   UnprocessableEntityException,
// } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import axios from 'axios';
// import { Repository } from 'typeorm';
// import {
//   Payment,
//   PAYMENT_STATUS_ENUM,
// } from '../payments/entities/payment.entity';
// import { IPaymentServiceCreate } from '../payments/interface/payment.interface';
// import { User } from '../users/entities/user.entity';

// //try catchfh 예외처리
// //발급 받은 get토큰 resolver로 return해서 다른 부분에서도 토큰을 쓸수 있게 해주기

// @Injectable()
// export class IamPortService {
//   constructor(
//     @InjectRepository(Payment)
//     private readonly paymentRepository: Repository<Payment>,
//     @InjectRepository(User)
//     private readonly usersRepository: Repository<User>,
//   ) {}

//   async getToken(impUid: string, amount: number): Promise<void> {
//     const imp_uid = impUid;
//     const getToken = await axios({
//       url: 'https://api.iamport.kr/users/getToken',
//       method: 'post', // POST method
//       headers: { 'Content-Type': 'application/json' },
//       data: {
//         imp_key: process.env.IMP_KEY,
//         imp_secret: process.env.IMP_SECRET,
//       },
//     });

//     const access_token = await getToken.data.response.access_token;
//     console.log('getToken', getToken);
//     // if (!getToken) {
//     //   throw new UnprocessableEntityException('유효하지 않은 토큰입니다');
//     // }

//     // imp_uid로 아임포트 서버에서 결제 정보 조회
//     const getPaymentData = await axios({
//       url: `https://api.iamport.kr/payments/${imp_uid}`,
//       method: 'get',
//       headers: {
//         Authorization: access_token,
//       },
//     }).catch((error) => {
//       console.log(error);
//       throw new UnprocessableEntityException('이미 결제되었습니다');
//     });

//     const paymentData = getPaymentData.data.response;

//     if (paymentData.amount !== amount) {
//       throw new UnprocessableEntityException('유효하지 않습니다.');
//     }

//     const result = await this.paymentRepository.findOne({
//       where: { impUid: imp_uid },
//     });
//     if (result) throw new ConflictException('이미 등록된 사람입니다');
//     // //입력받은 amount

//     // //저장된 amount를 찾기 위해 db불러오기
//     // const order = await this.paymentRepository.findOne({
//     //   where: { id: imp_uid },
//     // });
//     // //db에서 amount 찾아오기
//     // const amountToBePaid = order.amount;

//     // //입력받은 payment와 비교 후 맞으면 update로 금액 변경
//     // if (paymentData.amount === amountToBePaid) {
//     //   await this.paymentRepository.update(
//     //     { impUid: imp_uid }, //
//     //     { amount: paymentData.amount },
//     //   );
//     // } else {
//     // }
//   }

//   async cancel({
//     impUid,
//     amount,
//     user: _user,
//   }: IPaymentServiceCreate): Promise<Payment> {
//     const getToken = await axios({
//       url: 'https://api.iamport.kr/users/getToken',
//       method: 'post', // POST method
//       headers: { 'Content-Type': 'application/json' },
//       data: {
//         imp_key: '1463841663522130',
//         imp_secret:
//           'Tgea22TV8SpUPiqz6XYEGaTAgznp0YXv7nSudiezE3WuAcxHD8yoxB5oZxfnCbzTKNVULJILYlrT1ypw',
//       },
//     });

//     const access_token = await getToken.data.response.access_token;

//     const getCancelPayment = await axios({
//       url: 'https://api.iamport.kr/payments/cancel',
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: access_token, // 아임포트 서버로부터 발급받은 엑세스 토큰
//       },
//       data: {
//         imp_uid: impUid, // imp_uid를 환불 `unique key`로 입력
//         amount: amount, // 가맹점 클라이언트로부터 받은 환불금액
//       },
//     });
//     // const { response } = getCancelPayment.data; // 환불 결과
//     /* 환불 결과 동기화 */

//     const payment = this.paymentRepository.create({
//       impUid,
//       amount: -amount,
//       user: _user,
//       status: PAYMENT_STATUS_ENUM.CANCEL,
//     });

//     const user = await this.usersRepository.findOne({
//       where: { id: _user.id },
//     });
//     await this.usersRepository.update(
//       { id: user.id }, //
//       { payment: user.payment - amount },
//     );
//     const result = await this.paymentRepository.save(payment);

//     return result;
//   }
// }
