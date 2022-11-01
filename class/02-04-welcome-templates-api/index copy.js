const checkEmail = function ({ email }) {
  if (email === undefined) {
    console.log("이메일을 입력해 주세요!");
    return 1;
  } else if (!email.includes("@")) {
    console.log("이메일의 형식이 올바르지 않습니다");
    return 2;
  } else {
    return email;
  }
};

const getTemplates = function ({ name, age, school, email, createdAt }) {
  const templates = `
<html>
    <body>
        <h1>${name}님 가입을 환영합니다.</h1>
        <hr/>
        <div>이름: ${name}</div>
        <div>나이: ${age}</div>
        <div>학교: ${school}</div>
       <div>가입일: ${createdAt}</div>
    </body>
  </html>
`;

  return templates;
};

const sendTemplatesEm = function ({ name, email, templates }) {
  console.log(`${name}님의 ${email}로 ${templates}를 전송하였습니다`);
};

function createUser({ name, age, school, email, createdAt }) {
  // 1. 이메일 정상인지 확인하기 (1-존재여부, 2- "@"포함여부)
  checkEmail(email);
  const isValid = checkEmail(email);
  if (isValid === 1 || isValid === 2) return;

  // 2. 가입환영 템플릿 만들기
  const myTemplates = getTemplates({ name, age, school, email, createdAt });

  // 3. 이메일에 가입환영 템플릿 전송하기
  sendTemplatesEm();
}

const name = "철수";
const age = 9;
const school = "다람쥐초등학교";
const email = "a@a.com";
const createdAt = "2022-11-1";

createUser({ name, age, school, email, createdAt });
