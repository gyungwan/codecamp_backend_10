// 자릿수 더하기
// 문제 설명
// 자연수 N이 주어지면, N의 각 자릿수의 합을 구해서 return 하는 solution 함수를 만들어 주세요.
// 예를들어 N = 123이면 1 + 2 + 3 = 6을 return 하면 됩니다.

// 제한사항
// N의 범위 : 100,000,000 이하의 자연수
// 입출력 예
// N	answer
// 123	6
// 987	24
// 입출력 예 설명
// 입출력 예 #1
// 문제의 예시와 같습니다.

// 입출력 예 #2
// 9 + 8 + 7 = 24이므로 24를 return 하면 됩니다.

//여기에 입력하세요

function solution(n) {
  let answer = 0;
  let str = String(n);
  for (let i = 0; i < str.length; i++) {
    const num = parseInt(str[i]);
    answer = answer + num;
  }

  return answer;
}

/////

function solution(n) {
  let answer = 0;
  n = String(n);
  for (let i = 0; i < n.length; i++) {
    // answer = answer + parseInt(n[i])
    answer += parseInt(n[i]);
  }

  return answer;
}

////

function solution(n) {
  //배열 만들기 reduce 사용
  const answer = String(n)
    .split("")
    .reduce((acc, cur) => {
      console.log(acc, cur);
      return Number(acc) + Number(cur);
    }, 0);
  //한자리 숫자가 들올경우 acc,cur이 제대로 동작하지 않아서 초기값 설정
  return answer;
}

//////

function solution(n) {
  //배열 만들기 reduce 사용
  const answer = String(n)
    .split("")
    .reduce((acc, cur) => {
      console.log(acc, cur);
      return acc + Number(cur); //  acc는 최초값을 0으로 타입이 숫자열이서서 따로 숫자열로 변환을 안해주어도 가능
    }, 0);
  //한자리 숫자가 들올경우 acc,cur이 제대로 동작하지 않아서 초기값 설정
  return answer;
}
