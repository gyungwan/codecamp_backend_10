//가입환영 템플릿
//api 형태로 만들어주기

//매개변수 4개 만들기
function getWelcomeTemplate({ name, age, school, createdAt }) {
  const myTemplate = `
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

  console.log(myTemplate);
}
const name = "훈이";
const age = 16;
const school = "떡잎중학교";
const createdAt = "2022-11-1";
getWelcomeTemplate({ name, age, school, createdAt });
//전달할 인자값

//실무에서 데이터 보내고 받는과정에서  전달인자를 중괄호를 감싸고 매개변수도 중괄호를 감싸서 쓰면 변수명이 같은 값에 적용되서
//중간에 값이 빠져도 같은 변수명으로 들어가서 데이터가 꼬이는 일은 없음  - 구조분해할당
