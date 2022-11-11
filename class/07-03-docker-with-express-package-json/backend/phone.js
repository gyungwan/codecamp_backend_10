import coolsms from "coolsms-node-sdk";
const mysms = coolsms.default;

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

//실제 요청부분으로 바껴야함 사이트 들어가서 연습을 진행
export async function sendTokenToSMS(myphone, mytoken) {
  const messageService = new mysms(
    "NCSQII2SPJNS9VRA",
    "WO6MJASNK2TSSWFWQAESPCDIOXMK5SXV"
  );
  const result = await messageService.sendOne({
    to: myphone,
    from: "01036978284",
    text: `[코드캠프] 안녕하세요?1 요청하신 인증번호는 ${mytoken}입입니다.`,
  });
  console.log(result);
  //   console.log(myPhone + "번호로 인증번호" + result + "를 전송합니다.");
}
