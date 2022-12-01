import express, { application } from "express";

const app = express();

//상품 구매하기 API
app.post("/products/buy", (req, res) => {
  //1. 가진돈이 얼만큼 있는지 검증하는 코드
  // .. 디비에 돈 얼마있는지 조회 if문 사용
  //등등 10줄이 좀 넘을거 같은코드
  // 2. 판매 여부 검증하는 코드 대략 10줄 정도
  //.. 디비에 아직 판매중인지 확인
  //..if문 사용해서
  //..
  // 3. 삼품 구매하는 코드
  // if(돈있음 && !판매완료){
  // res.send ("상품 구매완료")
  //}
});

//상품 환불하기 API
app.post("/products/refund", (req, res) => {
  // 1. 판매여부 검증하는 코드 (10줄 정도 )
  //..
  //..
  //..
  // 2. 상품 환불하는 코드
  // if( 판매완료라면 ){
  //    res.send("상품 환불 완료!! ");
  //}else{
  // 아니라면 에러를 던져주기
  //}
});

app.listen(3000, () => {
  console.log(`백엔드 API서버가 켜졌어요`);
});
