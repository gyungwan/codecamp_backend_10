import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.use(cors());
app.get("/users", (req, res) => {
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

app.post("/users", (req, res) => {
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

app.listen(3000, () => {
  console.log(`백엔드 API서버가 켜졌어요`);
});
