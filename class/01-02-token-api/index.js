// createTokenOfPhone
//휴대폰 인증번호 api 만들기

//안좋은 예
// const createTokenOfPhone = function (qqq) {
//   // 1. 휴대폰 번호 자릿수 맞는지 확인하기  (10~11자리)
//   if (qqq.length >= 10 ) {
//     if (qqq.length <= 11) {
//       // 2. 휴대폰 토큰 6자리 만들기
//       const result = String(Math.floor(Math.random() * 1000000)).padStart(
//         6,
//         "0"
//       );
//       console.log(result);

//       // 3. 휴대폰 번호에 토큰 전송하기
//       console.log(qqq + "번호로 인증번호" + result + "를 전송합니다.");
//     } else {
//       console.log("에러 발생!! 핸드폰 번호를 제대로 입력해주세요.");
//     }
//   } else {
//     console.log("에러 발생!! 핸드폰 번호를 제대로 입력해주세요.");
//   }
// };

// createTokenOfPhone("01012345678");

//좋은 예   실무에서 많이 사용    리팩토링 - 결과는 같은데 내용을 좀더 효율적으로 바꾸는 작업

const createTokenOfPhone = function (qqq) {
  // 1. 휴대폰 번호 자릿수 맞는지 확인하기  (10~11자리)   //early exit  먼저 종료 시켜버리기 틀리면 종료되게 이런식으로하면 깔끔하게 코드작성가능
  if (qqq.length < 10 || qqq.length > 11) {
    console.log("에러 발생!! 핸드폰 번호를 제대로 입력해주세요.");
    return;
  }

  // 2. 휴대폰 토큰 6자리 만들기
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  console.log(result);

  // 3. 휴대폰 번호에 토큰 전송하기
  console.log(qqq + "번호로 인증번호" + result + "를 전송합니다.");
};
createTokenOfPhone("01012345678");

// //매개변수 (parameter)
// function asd(aaa, bbb){

// })
// asd("사과","바나나") //인자 (argument)
