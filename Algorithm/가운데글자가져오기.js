// 가운데 글자 가져오기
// 문제 설명
// 단어 s의 가운데 글자를 반환하는 함수, solution을 만들어 보세요. 단어의 길이가 짝수라면 가운데 두글자를 반환하면 됩니다.

// 재한사항
// s는 길이가 1 이상, 100이하인 스트링입니다.
// 입출력 예
// s	return
// "abcde"	"c"
// "qwer"	"we"

// //   여기에 입력하세요

function solution(s) {
  let answer = "";
  if (s.length % 2 == 0) {
    //s 의 길이가 짝수일 때
    answer = s[s.length / 2 - 1] + s[s.length / 2];
    // s 길이의 반 - 1 값에 해당하는 index 값 + s 길이의 반 값에 해당하는 index 값
  } else {
    //s 의 길이가 홀수일 때
    answer = s[Math.floor(s.length / 2)]; // s 길이의 반 값에서 반내림한 index 값
  }
  return answer;
}

/////

function solution(s) {
  const center = Math.floor(s.length / 2);
  //console.log(center)
  let answer = s[center];

  if (s.length % 2 === 0) {
    answer = s[center - 1] + answer;
  }
  return answer;
}

/////

function solution(s) {
  const center = Math.floor(s.length / 2);
  const answer =
    s.length % 2 !== 0 ? s[center] : s.slice(center - 1, center + 1);
  return answer;
}
