import { Product } from 'src/apis/products/entities/product.entity';
import { IAuthProduct, IAuthUser } from 'src/commons/types/context';
import { PAYMENT_STATUS_ENUM } from '../entities/payment.entity';

export interface IPaymentServiceCreate {
  impUid: string;
  amount: number;
  user: IAuthUser['user'];
  product?: IAuthProduct['product'];
  status?: PAYMENT_STATUS_ENUM;
}
