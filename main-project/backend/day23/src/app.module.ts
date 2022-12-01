import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './apis/auth/auth.module';
import { JwtAccessStrategy } from './apis/common/auth/jwt-access.strategy';
import { JwtRefreshStrategy } from './apis/common/auth/jwt-refresh.strategy';
import { JwtGoogleStrategy } from './apis/common/auth/jwt-social-google.strategy';
import { JwtKakaoStrategy } from './apis/common/auth/jwt-social-kakao.strategy';
import { JwtNaverStrategy } from './apis/common/auth/jwt-social-naver.strategy';
import { ProductsMainCategoriesModule } from './apis/mainCategories/productsMainCategories.module';
import { ProductsModule } from './apis/products/products.module';
import { ProductsSubCategoriesModule } from './apis/subCategories/productsSubCategories.module';
import { UsersModule } from './apis/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProductsModule,
    ProductsMainCategoriesModule,
    ProductsSubCategoriesModule,
    UsersModule,
    AuthModule,
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
  ],
  providers: [
    JwtAccessStrategy,
    JwtRefreshStrategy,
    JwtGoogleStrategy,
    JwtNaverStrategy,
    JwtKakaoStrategy,
  ],
})
export class AppModule {}
