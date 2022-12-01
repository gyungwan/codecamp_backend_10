// class Date {
//   getFullYear() {}
//   getMonth() {}
//   getDay() {}
// }

// new Date();

const aaa = new Date();
console.log(aaa.getFullYear());
console.log(aaa.getMonth() + 1);
console.log(aaa.getDay());

//class 는  this 란걸 가지고 있다.
class Monster {
  //몬스터를 만드는 설꼐도 설명서

  power = 10;

  //몬스터를 만들때 처음 한번만 실해해주는 함수 생서자 초기값을 지정해서 만들때 사용
  constructor(qqq) {
    this.power = qqq;
  }

  attack = () => {
    console.log("공격하자!!");
    console.log("내공격력은" + this.power + "야!!");
  };

  run = () => {
    console.log("도망가자!!");
  };
}

//클래스 만들떄 초기값 설정
//내장함수가 있음 constructor 생성자

const mymonster1 = new Monster(20); //설명서로 몬스터를 만들어냄 각가의 몬스터는 고유의 기능을 가질수 있음
mymonster1.attack();
mymonster1.run();

const mymonster2 = new Monster(50);
mymonster2.attack();
mymonster2.run();
