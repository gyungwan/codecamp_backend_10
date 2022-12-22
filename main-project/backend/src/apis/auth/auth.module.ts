import { CacheModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisClientOptions } from 'redis';
import { JwtAccessStrategy } from '../../commons/auth/jwt-access.strategy';
import { JwtRefreshStrategy } from '../../commons/auth/jwt-refresh.strategy';
import { JwtGoogleStrategy } from '../../commons/auth/jwt-social-google.strategy';
import { JwtKakaoStrategy } from '../../commons/auth/jwt-social-kakao.strategy';
import { JwtNaverStrategy } from '../../commons/auth/jwt-social-naver.strategy';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
//import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    JwtModule.register({}), //
    TypeOrmModule.forFeature([
      User, //
    ]),
    // CacheModule.register<RedisClientOptions>({
    //   store: redisStore,
    //   url: 'redis://my-redis:6379',
    //   isGlobal: true,
    // }),
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
