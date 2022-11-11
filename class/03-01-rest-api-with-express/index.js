// const express = require('express')  // 옛날방식 => commonjs
//다 가져와서 필요한부분을 사용

import express from "express"; // 요즘 방식 =>module
//필요한 부분만 가져와서 효율이 좋음
const app = express();

app.get("/qqqq", (req, res) => {
  //엔드포인트 /qqq  /req 요청
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log(`백엔드 API서버가 켜졌어요`);
});
