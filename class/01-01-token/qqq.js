// console.log("안녕하세요~~~!");
// console.log(String(Math.floor(Math.random() * 1000000)).padStart(6, 0));

// 인증 번호 토큰 생성

const getToken = function () {
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, 0);
  console.log(result);
};

getToken();

// Math.random(): 0~1 사이의 숫자를 무작위 생성
//6자리의 수자를 만들려고 * 1000000
//Math.floor 소수점없애주는
//숫자 앞에 0이 나오면 자릿수가 6자리로 나오지 않아서 .padStart(6, 0)를 사용
//이때 padStart를 사용하기 위해서 String를 써서 Math.floor를 형변환
