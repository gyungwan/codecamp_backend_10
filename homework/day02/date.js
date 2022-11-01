function getToday() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getMonth();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  console.log(
    `오늘은 ${year}년 ${month}월 ${day}일 ${hours}:${min}:${sec} 입니다.`
  );
  // return total; //숙제 오늘날짜 자동으로 만들기 (힌트 newDate)
}
getToday();
