// const express = require('express')  // 옛날방식 => commonjs
//다 가져와서 필요한부분을 사용

import express from "express"; // 요즘 방식 =>module

import { checkPhone, getToken, sendTokenToSMS } from "./phone.js"; //export 가져오기

// import ,{ checkPhone, getToken, sendTokenToSMS } from "./phone.js"
//export default 와 export 가져오기

//import  from "./phone.js";  export default 가져오기
// import * as qqq from "./phone.js";  한번에 다가져와서 사용할때

// qqq.checkPhone
// qqq.getToken
// qqq.sendTokenToSMS

// const swaggerUi = require('swagger-ui-express');
import swaggerUi from "swagger-ui-express";
// const swaggerDocument = require('./swagger.json');
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";

//필요한 부분만 가져와서 효율이 좋음

const app = express();
app.use(cors());
app.use(express.json()); //엤날에는 bodyParser 사용
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
//  app.get("./qqq",(req,res next) => {첫번째함수... next()}, ()=>{두번째 함수...}))
app.get("/boards", (req, res) => {
  // 1. DB(데이터베이스)에 접속 후, 데이터 조회 => 데이터 조회했다고 가정
  const result = [
    { number: 1, writer: "철수", title: "제목입니다!", contents: "내용입니다" },
    { number: 2, writer: "영희", title: "영희입니다!", contents: "영희에요" },
    { number: 3, writer: "훈이", title: "훈이입니다!", contents: "훈이에요" },
  ];

  //  2. DB(데이터베이스)에서 꺼내온 결과를 브라우저에 응답(response) 주기
  res.send(result);
});

app.post("/boards", (req, res) => {
  //  1. 브라우저에서 보내준 데이터 확인하기
  console.log(req);
  console.log("==================");
  console.log(req.body);

  // 2. DB에 접속후, 데이터를 저장 => 데이터를 저장했다고 가정

  // 3. Db에 저장된 결과를 브라우제에 응답(response) 주기
  res.send("게시물 등록에 성공하였습니다");
});

app.post("/tokens/phone", (req, res) => {
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
});

app.listen(3000, () => {
  console.log(`백엔드 API서버가 켜졌어요`);
});

//새로고침 기능 nodemon
