// 3진법 뒤집기
// 문제 설명
// 자연수 n이 매개변수로 주어집니다. n을 3진법 상에서 앞뒤로 뒤집은 후, 이를 다시 10진법으로 표현한 수를 return 하도록 solution 함수를 완성해주세요.

// 제한사항
// n은 1 이상 100,000,000 이하인 자연수입니다.
// 입출력 예
// n	result
// 45	7
// 125	229
// 입출력 예 설명
// 입출력 예 #1

// 답을 도출하는 과정은 다음과 같습니다.
// n (10진법)	n (3진법)	앞뒤 반전(3진법)	10진법으로 표현
// 45	1200	0021	7
// 따라서 7을 return 해야 합니다.
// 입출력 예 #2

// 답을 도출하는 과정은 다음과 같습니다.
// n (10진법)	n (3진법)	앞뒤 반전(3진법)	10진법으로 표현
// 125	11122	22111	229
// 따라서 229를 return 해야 합니다.

//여기에 입력하세요.
function solution(n) {
  // 1.3진법으로 변환
  n = n.toString(3);

  // 2. 앞 뒤 반전 (뒤집기)
  let reverse = "";
  for (let i = n.length - 1; i >= 0; i--) {
    reverse += n[i];
  }
  return parseInt(reverse, 3);
}

solution(45);
solution(125);

///메소드 사용
function solution(n) {
  //문열을배열로 그걸 뒤집고 다시 합쳐줌
  n = n.toString(3).split("").reverse().join("");
  return parseInt(n, 3);
}
solution(45);
solution(125);

// n진법으로 바꾸는 메소드
//진법 바꾸는 방법
// let a =123
//toString 괄안에 원는 진법의 숫자를 넣으면 그 진법으로 변환이 가능
// a.toString(3)
//3진법 변환

//parseInt 10진법로 변환해주는
//10진법으로 변환
//let reverse = "0021"
//parsInt(reverse, 3)
// , 뒤에ㄴ 몇진법으로 표현이 된 숫자인지 정해주면 10진법으로 바꿔줌
