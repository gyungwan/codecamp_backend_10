// 문자열 내림차순으로 배치하기
// 문제 설명
// 문자열 s에 나타나는 문자를 큰것부터 작은 순으로 정렬해 새로운 문자열을 리턴하는 함수, solution을 완성해주세요.
// s는 영문 대소문자로만 구성되어 있으며, 대문자는 소문자보다 작은 것으로 간주합니다.

// 제한 사항
// str은 길이 1 이상인 문자열입니다.
// 입출력 예
// s	return
// "Zbcdefg"	"gfedcbZ"

//여기에 입력하세요

function solution(s) {
  const arr = [];
  for (let i = 0; i < s.length; i++) {
    arr.push(s[i]);
  }
  arr.sort((a, b) => {
    return a > b ? -1 : 1;
  });
  let answer = "";
  for (let i = 0; i < arr.length; i++) {
    answer += arr[i];
  }
  return answer;
}

///////////// 메소드 사용

function solution(s) {
  const arr = s.split("");

  arr.sort((a, b) => (a > b ? -1 : 1));
  console.log(arr);

  const answer = arr.join("");
  return answer;
}
