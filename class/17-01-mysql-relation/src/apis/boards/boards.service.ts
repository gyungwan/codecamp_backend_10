import { Injectable } from '@nestjs/common';
import { IBoardsServiceCreate } from './interfaces/boards-service.interface';
import { Board } from './entities/board.entity';

// interface IBoardServiceCreate {
//   createBoardInput: CreateBoardInput;
// }

@Injectable()
export class BoardsService {
  // qqq(): string {
  //   return 'Hello World';
  // }
  findAll(): Board[] {
    // 1. DB(데이터베이스)에 접속 후, 데이터 조회 => 데이터 조회했다고 가정
    const result = [
      {
        number: 1,
        writer: '철수',
        title: '제목입니다!',
        contents: '내용입니다',
      },
      { number: 2, writer: '영희', title: '영희입니다!', contents: '영희에요' },
      { number: 3, writer: '훈이', title: '훈이입니다!', contents: '훈이에요' },
    ];

    //  2. DB(데이터베이스)에서 꺼내온 결과를 브라우저에 응답(response) 주기
    return result;
  }

  create({ createBoardInput }: IBoardsServiceCreate): string {
    //  1. 브라우저에서 보내준 데이터 확인하기
    // console.log(args);
    // console.log('==================');
    console.log(createBoardInput.writer);
    console.log(createBoardInput.title);
    console.log(createBoardInput.contents);

    // 2. DB에 접속후, 데이터를 저장 => 데이터를 저장했다고 가정

    // 3. Db에 저장된 결과를 브라우제에 응답(response) 주기
    return '게시물 등록에 성공하였습니다';
  }
}
