export function juMin(Number) {
  if (Number.includes("-") !== true) {
    console.log("에러발생 !!!형식이 올바르지 않습니다");
    return;
  } else if (
    Number.split("-")[0].length < 6 ||
    Number.split("-")[1].length > 7
  ) {
    console.log("에러 발생 개수를 제대로 입력해 주세요!!");
    return;
  } else {
    console.log(Number.slice(0, 8).padEnd(14, "*"));
  }
}

juMin("210510-1010101");
