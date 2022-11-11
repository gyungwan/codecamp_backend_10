// **027. 가장 큰 수 찾기**

// **`문제 설명`**

// str은 무작위 숫자인 문자열입니다.  해당 문자열에서 가장 큰 수를 구하는 함수를 만들어야 합니다.

// 만약 str에 "12345"가 들어온다면 "5"를 나타내야 합니다.

// **`입력 인자`**

// - str은 문자열입니다.

// **`주의 사항`**

// - str에서 각각의 문자를 숫자로 바꿔서 계산해야 합니다.
// - 비교할 수 있는 기준값이 있어야 합니다.
// - 최댓값을 저장할 수 있는 변수가 있어야 합니다.

// **`예상 결과`**

// bigNum("12345") // 5
// bigNum("87135") // 8

//여기에 입력하세요
function bigNum(str) {
  let biggest = 0;
  for (let i = 0; i < str.length; i++) {
    if (biggest < Number(str[i])) {
      biggest = Number(str[i]);
    }
  }
  return biggest;
}

//반복 횟수 한번 줄인 코드

function bigNum(str) {
  let biggest = Number(str[0]);
  for (let i = 1; i < str.length; i++) {
    if (biggest < Number(str[i])) {
      biggest = Number(str[i]);
    }
  }
  return biggest;
}

//스플릿으로 문자열을 하나하나 쪼개서 배열형식으로 만들고
// ... 스레 연산자를 이용해 배열의 문자열을 벗기고 요소하나하나를 매스멕스로 비교루 큰수 반환

function bigNum(str) {
  let num = str.split("");
  let biggest = Math.max(...num);
  return biggest;
}
