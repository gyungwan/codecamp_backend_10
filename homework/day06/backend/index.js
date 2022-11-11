import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js";
import {
  checkEmail,
  getWelcomeTemplate,
  sendTemplateToEmail,
} from "./email.js";

//
import "dotenv/config";

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.use(cors());
app.get("/user", (req, res) => {
  //엔드포인트 /qqq  /req 요청
  const users = [
    {
      email: "aaa@gmail.com",
      name: "철수",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "aaaa@gmail.com",
      name: "훈이",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "ccc@gmail.com",
      name: "짱구",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "aaa@gmail.com",
      name: "유리",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "aaa@gmail.com",
      name: "맹구",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
  ];

  console.log("유저정보조회");

  res.send(users);
});
~app.post("/user", (req, res) => {
  const user = req.body;
  console.log(user);

  res.send("유저 조회에 성공하였습니다");
});

// 2 커피 목록 조회 api 만들기
app.get("/starbucks", (req, res) => {
  const coffee = [
    { name: "아메리카노", kcal: 5 },
    { name: "카페라떼", kcal: 10 },
    { name: "콜드브루", kcal: 15 },
    { name: "카페모카", kcal: 50 },
    { name: "돌체라떼", kcal: 500 },
    { name: "카라멜라떼", kcal: 200 },
    { name: "바닐라라떼", kcal: 20 },
    { name: "에스프레소", kcal: 1 },
    { name: "디카페인", kcal: 5 },
    { name: "오트라떼", kcal: 300 },
  ];

  // console.log("커피 목록 조회");

  res.send(coffee);
});
app.post("/starbucks", (req, res) => {
  const coffee = req.body;
  console.log(coffee);

  res.send("커피 목록 조회에 성공하였습니다");
});

app.post("/tokens/phone", (req, res) => {
  const myphone = req.body.myphone;

  // 1. 휴대폰 번호 자릿수 맞는지 확인하기  (10~11자리)   //early exit  먼저 종료 시켜버리기 틀리면 종료되게 이런식으로하면 깔끔하게 코드작성가능

  const isValid = checkPhone(myphone);
  if (isValid === false) return;

  // 2. 휴대폰 토큰 6자리 만들기
  const myToken = getToken();

  // 3. 휴대폰 번호에 토큰 전송하기
  sendTokenToSMS(myphone, myToken);
  console.log(myphone + "번호로 인증번호를 전송했습니다");

  res.send(" 인증완료!!!");
});

app.post("/users", (req, res) => {
  // const name = req.body.name
  // const age = req.body.age
  // const school = req.body.school
  // const email = req.body.email

  const { name, myphone, site, email, jumin, pass } = req.body;
  console.log(name, email, jumin, myphone, site, pass);
  // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
  const isValid = checkEmail(email);
  if (isValid === false) return;

  // 2. 가입환영 템플릿 만들기
  const myTemplate = getWelcomeTemplate({ name, myphone, site });

  // 3. 이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail(email, myTemplate);
});

app.listen(3000, () => {
  console.log(`백엔드 API서버가 켜졌어요`);
});
