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

  constructor(qqq) {
    this.power = qqq;
  }

  //공통으로 사용할수 있는 메소드를 상속해서 주고 받을수 있다
  attack = () => {
    console.log("공격하자!!");
    console.log("내공격력은" + this.power + "야!!");
  };

  //   run = () => {
  //     console.log("qweafsfafsa")  //오버라이디 부모의 클래스 객체안에 똑같은 객체가 있으면 자식의 객체가 덮어씌어서 새롭게 만듬
  //   }                             // 오버라이딩 될수 있음(자식의 재정의)
}

class 공중몬스터 extends Monster {
  constructor(aaa) {
    //extendes 부모에게 상속받은 걸 다시 줄수 있음
    super(aaa);
  }
  run = () => {
    console.log("날라서 도망가자!!");
  };
}

class 지상몬스터 extends Monster {
  constructor(bbb) {
    super(bbb);
  }

  run = () => {
    console.log("뛰어서 도망가자!!");
  };
}

const mymonster1 = new 공중몬스터(20);
mymonster1.attack();
mymonster1.run();

const mymonster2 = new 지상몬스터(60);
mymonster2.attack();
mymonster2.run();
