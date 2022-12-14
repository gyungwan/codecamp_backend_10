import { Controller, Get } from '@nestjs/common';
//import { AppService } from './app.service';
import { Resolver, Mutation } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  //constructor() {}

  @Mutation(() => String)
  login() {
    return 'accessToken!!';
  }
}
