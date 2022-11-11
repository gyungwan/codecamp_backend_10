// **024. 특정 문자열 세기**

// **`문제 설명`**

// 문자열에서 "a"가 몇 번 등장하는지 횟수를 구하는 함수를 만들려고 합니다.

// 반복문을 이용해 "a"의 등장 횟수를 변수 "count"에 할당하세요.

// **`입력 인자`**

// - str은 문자열입니다.

// **`주의 사항`**

// - for을 이용해서 문제를 풀어야 합니다.
// - 문자열도 배열입니다.
// - 대문자 "A" 문자열도 "a" 에 포함입니다.

// **`예상 결과`**
// countLetter("I am from Korea")                         // 2
// countLetter("A day without laughter is a day wasted.") // 6

//여기에 입력하세요

function countLetter(str) {
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "a" || str[i] === "A") {
      // count = count + 1;
      // count += 1
      count++;
    }
  }
  console.log(count);
}

function countLetter(str) {
  str = str.toLowerCase(); //대문자를 소문자로 변경하는 메소드
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "a") {
      count++;
    }
  }
  return count;
}

//immutable => 원본 데이터 영향 X
//  문자열에도 사용가능한 메서드

//mutable => 원본 데이터 영향 O
//배열에만 사용가은한 메서드
