import { getToday } from "./utils.js";
import nodemailer from "nodemailer";

export function checkEmail(myEmail) {
  if (myEmail === undefined || myEmail.includes("@") === false) {
    console.log("에러 발생!!! 이메일 주소를 제대로 입력해 주세요!!!");
    return false;
  } else {
    return true;
  }
}

export function getWelcomeTemplate({ name, age, school }) {
  const myTemplate = `
          <html>
              <body>
              <div>
                <h1>${name}님 가입을 환영합니다!!!</h1>
                    <hr/>
                   <div>이름: ${name}</div>
                   <div>나이: ${age}</div>
                    <div>학교: ${school}</div>
                   <div>가입일: ${getToday()}</div>
                </div>
            </body>
          </html>
      `;
  console.log(myTemplate);
  return myTemplate;
}

export async function sendTemplateToEmail(myEmail, myTemplate) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "zddx1994@gmail.com",
      pass: "sfttyodxaeqddysd",
    },
  });

  const result = await transporter.sendMail({
    from: "zddx1994@gmail.com",
    to: myEmail,
    subject: "[코드캠프] 가입을 축하합니다",
    html: myTemplate,
  });

  console.log(result);

  // console.log(myEmail + "이메일로 가입환영템플릿 " + result + "를 전송합니다.");
}
