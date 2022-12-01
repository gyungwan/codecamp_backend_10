import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessStrategy } from '../common/auth/jwt-access.strategy';
import { JwtRefreshStrategy } from '../common/auth/jwt-refresh.strategy';
import { JwtGoogleStrategy } from '../common/auth/jwt-social-google.strategy';
import { JwtKakaoStrategy } from '../common/auth/jwt-social-kakao.strategy';
import { JwtNaverStrategy } from '../common/auth/jwt-social-naver.strategy';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({}), //
    TypeOrmModule.forFeature([
      User, //
    ]),
  ],
  providers: [
    AuthResolver, //
    AuthService,
    UsersService,
    JwtAccessStrategy,
    JwtGoogleStrategy,
    JwtRefreshStrategy,
    JwtNaverStrategy,
    JwtKakaoStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
