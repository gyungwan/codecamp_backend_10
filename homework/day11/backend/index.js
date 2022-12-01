import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";
import { getToken, sendTokenToSMS } from "./phone.js";
import { UsersController } from "./controllers/users.controller.js";

import mongoose from "mongoose";
// //
import "dotenv/config";

import { Token } from "./models/phoneSchema.js";
const usersController = new UsersController();
const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.use(cors());

//회원가입 api
app.post("/users", usersController.usersPost);

//회원 목록 조회 api
app.get("/users", usersController.usersGet);

//토큰 인증요청 api
app.post("/tokens/phone", async (req, res) => {
  const myphone = req.body.phone;
  const mytoken = getToken();

  const token = new Token({
    token: mytoken,
    phone: myphone,
    isAuth: false,
  });

  const answer = await Token.findOne({ phone: myphone });

  if (!answer) {
    await token.save();
  } else {
    await Token.updateOne({ phone: myphone }, { token: mytoken });
  }

  sendTokenToSMS(myphone, mytoken);
  res.send(myphone + "으로 인증 문자가 전송되었습니다.");
});

//인증완료 api
app.patch("/tokens/phone", async (req, res) => {
  const myphone = req.body.phone;
  const answer = await Token.findOne({ phone: myphone });

  if (!answer) {
    res.send("false");
  } else {
    if (req.body.token !== answer.token) {
      res.send("false");
    } else {
      await Token.updateOne({ phone: myphone }, { isAuth: "true" });
      res.send("true");
    }
  }
});

mongoose
  .connect("mongodb://my-database:27017/mydocker10")
  .then(() => console.log("DB에 접속 되었습니다."))
  .catch(() => console.log("DB접속에 실패하였습니다."));

app.listen(3000, () => {
  console.log(`백엔드 API서버가 켜졌어요`);
});
