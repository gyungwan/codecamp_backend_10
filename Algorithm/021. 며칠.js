// 021. 며칠

// **`문제 설명`**

// 입력되는 달(month)에 따라 각 달에 며칠이 있는지 보여주는 함수를 만들려고 합니다.

// 각 조건에 해당하는 알맞은 값을 입력해주세요.

// **`입력 인자`**

// - month는 1~12의 숫자

// **`주의 사항`**

// - || 연산자가 필요합니다.
// - 2월은 28일로 계산합니다.

// **`예상 결과`**

// days(1) // 31
// days(2) // 28
// days(4) // 30

//여기에 입력하세요
function days(month) {
  if (
    month === 1 ||
    month === 3 ||
    month === 5 ||
    month === 7 ||
    month === 8 ||
    month === 10 ||
    month === 12
  ) {
    console.log(31);
  } else if (month === 4 || month === 6 || month === 9 || month === 11) {
    console.log(30);
  } else {
    console.log(28);
  }
}
