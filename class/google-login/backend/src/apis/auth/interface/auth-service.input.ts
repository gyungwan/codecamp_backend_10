import { Response } from 'express';
import { User } from 'src/apis/users/entities/user.entity';
import { IAuthUserItem } from 'src/commons/types/context';

export interface IAuthServiceGetAccessToken {
  user: User | IAuthUserItem;

  // res: Pick<IContext, 'res'>;
}
export interface IAuthServiceSetRefreshToken {
  user: User;
  res: Response;
  // res: Pick<IContext, 'res'>;
}
