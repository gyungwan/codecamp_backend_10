export const checkPhone = function (myPhone) {
  if (myPhone.length < 10 || myPhone.length > 11) {
    console.log("에러 발생!! 핸드폰 번호를 제대로 입력해주세요.");
    return false; //함수종료  이 함수만 종료됨
  } else {
    return true;
  }
};

export const getToken = function () {
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  console.log(result);
  return result;
};

export const sendTokenToSMS = function (myPhone, result) {
  console.log(myPhone + "번호로 인증번호" + result + "를 전송합니다.");
};
