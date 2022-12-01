import { Injectable } from '@nestjs/common';
import { ICreateStarbucksInput } from './interfaces/menus-service.interface';

@Injectable()
export class StarbucksService {
  starbucksMenu() {
    return [
      //
      {
        menu: '아메리카노',
        price: 4500,
        kcal: 5,
        saturated_fat: 0,
        protein: 0,
        salt: 0,
        sugar: 0,
        caffeine: 75,
      },
      {
        menu: '토피넛 라떼',
        price: 6100,
        kcal: 240,
        saturated_fat: 8,
        protein: 5,
        salt: 180,
        sugar: 27,
        caffeine: 75,
      },
      {
        menu: '제주금귤민트티',
        price: 6100,
        kcal: 190,
        saturated_fat: 0,
        protein: 0,
        salt: 10,
        sugar: 37,
        caffeine: 0,
      },
      {
        menu: '제주유기농말차프라프치노',
        price: 6300,
        kcal: 230,
        saturated_fat: 7,
        protein: 5,
        salt: 150,
        sugar: 28,
        caffeine: 60,
      },
      {
        menu: '제주쑥떡프라프치노',
        price: 7500,
        kcal: 460,
        saturated_fat: 10,
        protein: 8,
        salt: 250,
        sugar: 57,
        caffeine: 0,
      },
    ];
  }

  create({ createStarbucksInput }: ICreateStarbucksInput): string {
    console.log(createStarbucksInput);
    return '등록에 성공하였습니다';
  }
}
