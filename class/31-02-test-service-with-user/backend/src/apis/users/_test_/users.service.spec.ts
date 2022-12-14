import {
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

//나만의 미니 TypoORM 만들기
class MockUsersRepository {
  mydb = [
    { email: 'a@a.com', password: '0000', name: '짱구', age: 8 },
    { email: 'qqq@qqq.com', password: '1234', name: '맹구', age: 8 },
  ];

  findOne({ where }) {
    const users = this.mydb.filter((el) => el.email === where.email);
    if (users.length) return users[0];
    return null;
  }

  save({ email, password, name, age }) {
    this.mydb.push({ email, password, name, age });
    return { email, password, name, age };
  }
}

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const usersModule = await Test.createTestingModule({
      // imports:[TupeOrmMof]
      // Controller

      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUsersRepository,
          //   useClass: getRepositoryToken(User), //여기가 진짜 DB들어가게함
        },
      ],
    }).compile();

    usersService = usersModule.get<UsersService>(UsersService);
  });

  // 이렇게 하면 진짜 DB가서 찾아와서 비교함 실제 서비스에서 사용하면 실제 디비에 있는값들이 바뀌고 그러니까  이런 방법은 자제
  //   describe('findOne', () => {
  //     const result = usersService.findOne({ email: 'a@a.com' });
  //                     // 객체와 배열을 비교할때 시용
  //     expect(result).toStrictEqual({
  //       email: 'a@a.com',
  //       name: '짱구,',
  //       ...
  //     });
  //   });

  describe('create', () => {
    it('이미 존재하는 이메일 검증하기!!', async () => {
      const myData = {
        email: 'a@a.com',
        hashedPassword: '1234',
        name: '철수',
        age: 12,
      };
      try {
        await usersService.create({ ...myData });
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        //expect(error).toBeInstanceOf(UnprocessableEntityException); //잘만들었는지 확인하는 방법 (일부러 에러 유도)
      }
    });

    it('회원 등록  잘 됐는지 검증!!', async () => {
      const myData = {
        email: 'bbb@bbb.com',
        hashedPassword: '1234',
        name: '철수',
        age: 12,
      };

      const result = await usersService.create({ ...myData });
      expect(result).toStrictEqual({
        email: 'bbb@bbb.com',
        password: '1234',
        name: '철수',
        age: 12,
      });
    });

    ///TDD => 테스트를 먼저 만들자 !
    // it("이메일 길이가  초과됐을때 검증!!!", ()=>{
    //     const myData ={
    //         email: "sdadsafsafasfasfaf"
    //     }
    //     try{
    //         usersService.create({...myData})
    //     }catch(error){
    //         expect(error).toBeInstanceOf()
    //     }
    // })
  });
});
