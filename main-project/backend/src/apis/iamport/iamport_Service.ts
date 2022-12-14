// import {
//   ConflictException,
//   HttpException,
//   Injectable,
//   UnprocessableEntityException,
// } from '@nestjs/common';
// import axios from 'axios';

// @Injectable()
// export class Iamport_Service {
//   async getToken() {
//     try {
//       const result = await axios.post('https://api.iamport.kr/users/getToken', {
//         imp_key: process.env.IMP_KEY,
//         imp_secret: process.env.IMP_SECRET,
//       });
//       return result.data.response.access_token;
//     } catch (error) {
//       throw new HttpException(
//         error.response.data.message,
//         error.response.status,
//       );
//     }
//   }

//   async checkPaid({ impUid, token, amount }) {
//     try {
//       const result = await axios.get(
//         `https://api.iamport.kr/payments/${impUid}`,
//         {
//           headers: { Authorization: token },
//         },
//       );
//       if (result.data.response.status !== 'paid')
//         throw new ConflictException('결제 내역이 존재하지 않습니다.');

//       if (result.data.response.amount !== amount)
//         throw new UnprocessableEntityException('결제금액이 잘못되었습니다.');

//       console.log(result); //result 안에 amount가 어떻게 들어있는지 확인 result.data.response.amount
//     } catch (error) {
//       if (error?.response?.data?.message) {
//         throw new HttpException(
//           error.response.data.message,
//           error.response.status,
//         );
//       } else {
//         throw error;
//       }
//     }
//   }
// }
