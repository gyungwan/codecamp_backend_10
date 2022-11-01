//1. shorthand-property
function qqq(aaa) {
  //전달 받은 인자를 aaa매개변수에 넣어서 함수안에서 실행시킴
  console.log(aaa); //객체
  console.log(aaa.name); //철수
  console.log(aaa.age); //12
  console.log(aaa.school); //다람쥐초등학교
}

const name = "철수";
const age = 12;
const school = "다람쥐초등학교";
// const profile = { name, age, school }; //키와 밸류가 같아서 밸류를 생략함 => shorthand-property

// qqq(profile); //qqq함수에 네임 에이지 스쿨이 담긴 객체가 전달됨

//이런식으로 함수를 호출할때 바로 담아서 사용가능
qqq({ name, age, school });
