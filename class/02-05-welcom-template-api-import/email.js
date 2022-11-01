import { getToday } from "./date.js";

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
                  <h1>${name}님 가입을 환영합니다!!!</h1>
                  <hr />
                  <div>이름: ${name}</div>
                  <div>나이: ${age}</div>
                  <div>학교: ${school}</div>
                  <div>가입일: ${getToday()}</div>
              </body>
          </html>
      `;
  console.log(myTemplate);
  return myTemplate;
}

export function sendTemplateToEmail(myEmail, result) {
  console.log(myEmail + "이메일로 가입환영템플릿 " + result + "를 전송합니다.");
}
