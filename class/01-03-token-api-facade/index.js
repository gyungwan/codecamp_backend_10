// createTokenOfPhone
//휴대폰 인증번호 api 만들기
//facade 퍼사드 기법으로 리팩토링

const checkPhone = function (myPhone) {
  if (myPhone.length < 10 || myPhone.length > 11) {
    console.log("에러 발생!! 핸드폰 번호를 제대로 입력해주세요.");
    return false; //함수종료  이 함수만 종료됨
  } else {
    return true;
  }
};

const getToken = function () {
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  console.log(result);
  return result;
};

const sendTokenToSMS = function (myPhone, result) {
  console.log(myPhone + "번호로 인증번호" + result + "를 전송합니다.");
};

//좋은 예   실무에서 많이 사용    리팩토링 - 결과는 같은데 내용을 좀더 효율적으로 바꾸는 작업
const createTokenOfPhone = function (myPhone) {
  // 1. 휴대폰 번호 자릿수 맞는지 확인하기  (10~11자리)   //early exit  먼저 종료 시켜버리기 틀리면 종료되게 이런식으로하면 깔끔하게 코드작성가능
  checkPhone(myPhone);
  const isValid = checkPhone(myPhone);
  if (isValid === false) return;

  // 2. 휴대폰 토큰 6자리 만들기
  const myToken = getToken();

  // 3. 휴대폰 번호에 토큰 전송하기
  sendTokenToSMS(myPhone, myToken);
};

createTokenOfPhone("01012345678");
