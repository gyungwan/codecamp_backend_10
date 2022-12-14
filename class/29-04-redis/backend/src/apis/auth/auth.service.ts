import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IContext } from 'src/commons/types/context';
import { User } from '../users/entities/user.entity';

import {
  IAuthServiceGetAccessToken,
  IAuthServiceSetRefreshToken,
} from './interface/auth-service.interface';

// interface IAuthServiceSetRefreshToken {
//   user: User;
//   res: Response;
//   // res: Pick<IContext, 'res'>;
// }

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  setRefreshToken({ user, res }: IAuthServiceSetRefreshToken): void {
    console.log(process.env.JWT_REFRESH_KEY);
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: process.env.JWT_REFRESH_KEY, expiresIn: '2w' },
    );
    //@ts-ignore
    res.setHeader('Set-Cookie', `refreshToken= ${refreshToken} `);
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: process.env.JWT_ACCESS_KEY, expiresIn: '2h' },
    );
  }
}
