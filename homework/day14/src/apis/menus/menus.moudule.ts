import { Module } from '@nestjs/common';
import { StarbucksResolver } from './menus.resolver';
import { StarbucksService } from './menus.service';

@Module({
  providers: [
    StarbucksResolver, //
    StarbucksService,
  ],
})
export class StarbucksModule {}
