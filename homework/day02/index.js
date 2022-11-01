import {
  checkEmail,
  getWelcomeTemplate,
  sendTemplateToEmail,
  juMin,
} from "./email.js";

function createUser({ name, phone, email, maskingJu, site }) {
  // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
  const isValid = checkEmail(email);
  if (isValid === false) return;

  // 2. 가입환영 템플릿 만들기
  const myTemplate = getWelcomeTemplate({
    name,
    site,
    email,
    phone,
    maskingJu,
  });

  // 3. 이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail(email, myTemplate);
}

const name = "코드캠프";
const phone = "000-0000-0000";
const num = "210510-1010101";
const maskingJu = juMin({ num });
const email = "suppor@codebootcamp.co.kr";
const site = "codeBootCamp.co.kr";
createUser({ name, phone, email, maskingJu, site });
