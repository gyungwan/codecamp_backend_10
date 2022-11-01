export function checkEmail(myEmail) {
  if (myEmail === undefined || myEmail.includes("@") === false) {
    console.log("에러 발생!!! 이메일 주소를 제대로 입력해 주세요!!!");
    return false;
  } else {
    return true;
  }
}

export function juMin({ num }) {
  let result = num.slice(0, 8).padEnd(14, "*");
  return result;
}

export function getWelcomeTemplate({ name, email, phone, site, maskingJu }) {
  const myTemplate = `
          <html>
              <body>
                  <h1>${name}님 가입을 환영합니다!!!</h1>
                  <hr />
                  <div>이메일: ${email}</div>
                  <div>주민번호: ${maskingJu}</div>
                  <div>휴대폰 번호: ${phone}</div>
                  <div>내가 좋아하는 사이트: ${site}</div>
                  
              </body>
          </html>
      `;
  console.log(myTemplate);
  return myTemplate;
}

export function sendTemplateToEmail(myEmail, result) {
  console.log(myEmail + "이메일로 가입환영템플릿 " + result + "를 전송합니다.");
}
