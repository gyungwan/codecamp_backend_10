//1. 주민번호를 생성하는 함수 앞자리 6 뒷자리7
//2.

export const juMinTotal = function (juMin) {
  if (!juMin.includes("-")) {
    return 1;
  } else if (juMin.length > 14) {
    return 2;
  }
};

export const result = function (juMin) {
  const juMinNumber = juMin.split("-");

  const startNum = juMinNumber[0];
  const endNum = juMinNumber[1].slice(0, 1).padEnd(7, "*");

  `${startNum}-${endNum}`;
  console.log(`${startNum}-${endNum}`);
};

export const customRegistrationNumber = function (qqq) {
  const isValid = juMinTotal(qqq);
  if (isValid === 1) {
    console.log("에러발생!!형식이 올바르지 않습니다.");
    return;
  } else if (isValid === 2) {
    console.log("에러발생 개수를 제대로 입력해 주세요");
    return;
  }

  result(qqq);
};

customRegistrationNumber("210510-1010101");
