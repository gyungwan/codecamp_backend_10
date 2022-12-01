import {
  getWelcomeTemplate,
  sendTemplateToEmail,
} from "./services/email.service.js";
import { getOg, jumin } from "./services/getOg.service.js";
import { User } from "../models/userSchema.js";
import { Token } from "../models/phoneSchema.js";

export class UsersController {
  usersPost = async (req, res) => {
    //유저정보를 변수에 할당
    const { name, email, personal, prefer, pwb, phone } = req.body;
    //유저가 좋아하는 사이트를 og정보만 빼와서 변수에 저장
    const ogObj = await getOg(prefer);

    //유저의 폰번호가
    const findToken = await Token.findOne({ phone: req.body.phone });
    console.log(findToken);
    if (!findToken || findToken.isAuth === "false") {
      return res.send("에러!! 핸드폰번호가 인증되지 않았습니다.").status(422);
    } else {
    }

    //요청받은 유저의 정보를 저장
    const user = new User({
      name,
      email,
      personal: await jumin(personal),
      prefer,
      pwb,
      phone,
      og: {
        title: ogObj["og:title"],
        description: ogObj["og:description"],
        image: ogObj["og:image"],
      },
    });

    await user.save();
    //id 값을 찾기위해 저장한 유저정보를 변주에 할당해줌
    const getId = await User.findOne({ name: name });

    if (user) {
      // 가입환영 템플릿 만들기
      const myTemplate = getWelcomeTemplate({ name, phone, prefer });

      // 이메일에 가입환영 템플릿 전송하기
      sendTemplateToEmail(email, myTemplate);

      //저장후 응답으로 id 값 보내주기
      res.send(getId._id);
    }
  };

  usersGet = async (req, res) => {
    const answer = await User.find();

    res.send(answer);
  };
}
