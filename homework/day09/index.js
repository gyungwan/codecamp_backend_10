import express from "express";
import { getToken, sendTokenToSMS } from "./phone.js";
import cors from "cors";
import { Token } from "./models/token.model.js";
import mongoose from "mongoose";
import "dotenv/config";
const app = express();
app.use(cors());
app.use(express.json());
//폰번호와 토큰 받와아서 인증후 인증번호 핸드폰에 보내는
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

//몽고디비 접속하기
mongoose
  .connect("mongodb://my-database:27017/mydocker10")
  .then(() => console.log("DB에 접속 되었습니다."))
  .catch(() => console.log("DB접속에 실패하였습니다."));

app.listen(3000, () => {
  console.log(`백엔드 API서버가 켜졌어요`);
});
