import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IContext } from 'src/commons/types/context';
import { User } from '../users/entities/user.entity';
import { IAuthServiceGetAccessToken } from '../users/interfaces/users-service.interface';
import { IAuthServiceSetRefreshToken } from './interface/auth-service.input';

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
    res.setHeader('Set-Cookie', `refreshToken= ${refreshToken}; path=/;`);
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: process.env.JWT_ACCESS_KEY, expiresIn: '30s' },
    );
  }
}
