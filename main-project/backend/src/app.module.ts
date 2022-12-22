import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisClientOptions } from 'redis';
import { AuthModule } from './apis/auth/auth.module';
import { JwtAccessStrategy } from './commons/auth/jwt-access.strategy';
import { JwtRefreshStrategy } from './commons/auth/jwt-refresh.strategy';
import { JwtGoogleStrategy } from './commons/auth/jwt-social-google.strategy';
import { JwtKakaoStrategy } from './commons/auth/jwt-social-kakao.strategy';
import { JwtNaverStrategy } from './commons/auth/jwt-social-naver.strategy';
import { FilesModule } from './apis/files/files.module';
import { ProductsMainCategoriesModule } from './apis/mainCategories/productsMainCategories.module';
import { PaymentModule } from './apis/payments/payments.module';
import { ProductsModule } from './apis/products/products.module';
import { ProductsSubCategoriesModule } from './apis/subCategories/productsSubCategories.module';
import { UsersModule } from './apis/users/users.module';
import * as redisStore from 'cache-manager-redis-store';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    FilesModule,
    ProductsModule,
    ProductsMainCategoriesModule,
    ProductsSubCategoriesModule,
    PaymentModule,
    UsersModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://10.45.193.3:6379',
      isGlobal: true,
    }),
  ],
  providers: [
    JwtAccessStrategy,
    JwtRefreshStrategy,
    JwtGoogleStrategy,
    JwtNaverStrategy,
    JwtKakaoStrategy,
  ],
  controllers: [AppController],
})
export class AppModule {}
