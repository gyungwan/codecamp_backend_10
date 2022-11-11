// const { ApolloServer, gql } = require("apollo-server");
import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  input CreateBoardsInput {
    writer: String
    title: String
    contents: String
  }

  type MyReturn {
    number: Int
    writer: String
    title: String
    contents: String
  }

  type Query {
    # fetchBoards: MyReturn # 객체 1개를 의미
    fetchBoards: [MyReturn] #배열안의객체를의미
  }

  type Mutation {
    # createBoard( writer: String, title: String,contents: String): String

    createBoard(createBoardInput: CreateBoardsInput!): String
  }
`;

const resolvers = {
  Query: {
    fetchBoards: (parent, args, context, info) => {
      // 1. DB(데이터베이스)에 접속 후, 데이터 조회 => 데이터 조회했다고 가정
      const result = [
        {
          number: 1,
          writer: "철수",
          title: "제목입니다!",
          contents: "내용입니다",
        },
        {
          number: 2,
          writer: "영희",
          title: "영희입니다!",
          contents: "영희에요",
        },
        {
          number: 3,
          writer: "훈이",
          title: "훈이입니다!",
          contents: "훈이에요",
        },
      ];

      //  2. DB(데이터베이스)에서 꺼내온 결과를 브라우저에 응답(response) 주기
      return result;
    },
  },
  Mutation: {
    //매개변수
    //                데이터, 헤더정보, 단일 쿼리에대한 정보확인
    createBoard: (_, args /* context, info /** */) => {
      //  1. 브라우저에서 보내준 데이터 확인하기
      console.log(args);
      console.log("==================");
      console.log(args.createBoardInput.writer);
      console.log(args.createBoardInput.title);
      console.log(args.createBoardInput.contents);

      // 2. DB에 접속후, 데이터를 저장 => 데이터를 저장했다고 가정

      // 3. Db에 저장된 결과를 브라우제에 응답(response) 주기
      return "게시물 등록에 성공하였습니다";
    },
    createTokenOfPhone: (_, args) => {
      const myPhone = req.body.qqq;

      // 1. 휴대폰 번호 자릿수 맞는지 확인하기  (10~11자리)   //early exit  먼저 종료 시켜버리기 틀리면 종료되게 이런식으로하면 깔끔하게 코드작성가능

      const isValid = checkPhone(myPhone);
      if (isValid === false) return;

      // 2. 휴대폰 토큰 6자리 만들기
      const myToken = getToken();

      // 3. 휴대폰 번호에 토큰 전송하기
      sendTokenToSMS(myPhone, myToken);
      console.log(myPhone + "번호로 인증번호를 전송했습니다");

      res.send(" 인증완료!!!");
    },
  },
};

const app = new ApolloServer({
  typeDefs, //숏핸드 프로퍼티 타입데피니션
  resolvers,
  cors: true, //모든 사이트 허용
  //cors:{origin ["https://naver.com","https://daumm.net"]}특정사이트만허용
});

app.listen(3001).then(() => {
  console.log(`백엔드 API 서버가 켜졌어요.`);
});
