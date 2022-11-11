// 문자열 다루기 기본
// 문제 설명
// 문자열 s의 길이가 4 혹은 6이고, 숫자로만 구성돼있는지 확인해주는 함수, solution을 완성하세요. 예를 들어 s가 "a234"이면 False를 리턴하고 "1234"라면 True를 리턴하면 됩니다.

// 제한 사항
// s는 길이 1 이상, 길이 8 이하인 문자열입니다.
// s는 영문 알파벳 대소문자 또는 0부터 9까지 숫자로 이루어져 있습니다.
// 입출력 예
// s	return
// "a234"	false
// "1234"	true
// 문제가 잘 안풀린다면😢
// 힌트가 필요한가요? [코딩테스트 연습 힌트 모음집]으로 오세요! → 클릭

////여기에 입력하세요

function solution(s) {
  var answer = "";
  if (s.length !== 4 && s.length !== 6) return false;

  for (let i = 0; i < s.length; i++) {
    if (isNaN(numbaer(s[i]))) {
      return false;
    } else {
      return false;
    }
    return answer;
  }

  ////

  function solution(s) {
    let answer = true;
    if (s.length !== 4 && s.length !== 6) {
      answer = false;
    }
    for (let i = 0; i < s.length; i++) {
      if (isNaN(s[i])) {
        answer = false;
      }
    }

    return answer;
  }

  ///////

  function solution(s) {
    if (s.length !== 4 && s.length !== 6) {
      return false;
    }
    for (let i = 0; i < s.length; i++) {
      if (isNaN(s[i])) {
        return false;
      }
    }
    return true;
  }

  ///////

  function solution(s) {
    if (s.length !== 4 && s.length !== 6) {
      return false;
    }
    const answer = s.split("").filter((num) => {
      //e데이터가 숫자가 아닌 문자타입만 남긴다.
      //NaN 값인 데이터만 남긴다
      return isNaN(num);
    });
    return answer.length === 0;
  }
}
