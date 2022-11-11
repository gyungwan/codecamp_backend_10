// 41**. 조건문 실전 적용 - 점수에 따른 등급**
// ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2a7c4e64-7fed-4057-af3a-6c85b2e006f2/_2021-04-21__3.46.01.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2a7c4e64-7fed-4057-af3a-6c85b2e006f2/_2021-04-21__3.46.01.png)
// 입력되는 score에 따라 알맞은 등급을 적어야 합니다.
// 100~90 → "A"

// 89~80 → "B"

// 79~70 → "C"

// 69~60 → "D"

// 59점 이하는 "F"

// 100점 초과나 0점 미만은 "잘못된 점수입니다"라는 문구를 띄워주세요.
// **`입력 인자`**
// score - 숫자열

// // 예상결과

// grade(105)  // "잘못된 점수입니다"
// grade(-10)  // "잘못된 점수입니다"
// grade(97)   // "A"
// grade(86)   // "B"
// grade(75)   // "C"
// grade(66)   // "D"
// grade(52)   // "F"

//여기에 입력하세요

function grade(score) {
  if (score > 100 || score < 0) {
    return "잘못된 점수 입니다";
  } else if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "F";
  }
}
