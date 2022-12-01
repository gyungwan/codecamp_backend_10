import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthServiceGetAccessToken } from '../users/interfaces/users-service.interface';
import { IAuthServiceSetRefreshToken } from './interface/auth-service.interface';

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
      { secret: process.env.JWT_ACCESS_KEY, expiresIn: '40s' },
    );
  }
}
