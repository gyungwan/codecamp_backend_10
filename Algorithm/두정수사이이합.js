// 두 정수 사이의 합
// 문제 설명
// 두 정수 a, b가 주어졌을 때 a와 b 사이에 속한 모든 정수의 합을 리턴하는 함수, solution을 완성하세요.
// 예를 들어 a = 3, b = 5인 경우, 3 + 4 + 5 = 12이므로 12를 리턴합니다.

// 제한 조건
// a와 b가 같은 경우는 둘 중 아무 수나 리턴하세요.
// a와 b는 -10,000,000 이상 10,000,000 이하인 정수입니다.
// a와 b의 대소관계는 정해져있지 않습니다.
// 입출력 예
// a	b	return
// 3	5	12
// 3	3	3
// 5	3	12

///여기에 입력하세요

function solution(a, b) {
  let answer = 0;
  if (a >= b) {
    for (let i = b; i <= a; i++) {
      answer += i;
    }
  } else {
    for (let j = a; j <= b; j++) {
      answer += j;
    }
  }

  return answer;
}

solution(3, 5);
solution(3, 3);
solution(5, 3);

///

function solution(a, b) {
  let answer = 0;
  if (a === b) {
    return a;
  } else {
    //최솟값
    //반복문이 실행될떄 성절되는 초깃값(a와 b중에서 더작은수가 들어온다)
    // const start = a > b ? b:a
    const start = Math.min(a, b);
    //최대값
    //반복문이 종료되는 조건을 설ㅈ어(a와b중에서 더 큰수가 들어온다.)
    // const end = a>b ?a:b
    const end = Math.max(a, b);

    for (let i = start; i <= end; i++) {
      answer += i;
    }
  }
  return answer;
}

////reduce 메소드 사용
function solution(a, b) {
  if (a === b) {
    return a;
  }
  const start = Math.min(a, b);
  const end = Math.max(a, b);

  const answer = new Array(end - start).fill(1).reduce((acc, cur, i) => {
    const num = start + cur + i;
    return acc + num;
  }, start);
}
solu;
