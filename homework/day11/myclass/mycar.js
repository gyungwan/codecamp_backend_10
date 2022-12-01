class Mycar {
  type = "tesla";
  power = 750;
  color = "white";

  constructor(pow, typ, col) {
    this.power = pow;
    this.type = typ;
    this.color = col;
  }

  start = () => {
    console.log(`내 차는 ${this.type} 이고 ${this.color}색상이야`);
    console.log(`최대 마력은 ${this.power}이야`);
    console.log("출발하자!!");
  };
  stop = () => {
    console.log("브레이크!!");
  };
}

const car1 = new Mycar(750, "아우디", "메트블랙");
car1.start();
car1.stop();

const car2 = new Mycar(800, "벤틀리", "블랙");
car2.start();
car2.stop();

////상속 실패 전역이랑 같이 못쓰는건가? 아니면 내 코드에 문제가 있는거 같은데 여기도 맨 밑에서 변수명을 잘못지정해줌

class car {
  type = "tesla";
  power = 750;
  color = "white";
  speed = 0;

  constructor(pow, typ, col, spd) {
    this.power = pow;
    this.type = typ;
    this.color = col;
    this.speed = spd;
  }

  stop = () => {
    console.log(`브레이크 속도 ${this.speed}으로`);
  };
}

class mycar1 extends car {
  constructor(stop) {
    super(stop);
  }
  start = () => {
    console.log("이건 드라이브용");
    console.log(`이 차는 ${this.type} 이고 ${this.color}색상이야`);
    console.log(`최대 마력은 ${this.power}이야`);
    console.log("출발하자!!");
  };
}

class mycar2 extends car {
  constructor(stop) {
    super(stop);
  }
  start = () => {
    console.log("이건 스포츠용");
    console.log(`이 차는 ${this.type} 이고 ${this.color}색상이야`);
    console.log(`최대 마력은 ${this.power}이야`);
    console.log("출발하자!!");
  };
}

const Mycar1 = new mycar1(600, "테슬라", "화이트", 0);
Mycar1.start();
Mycar1.stop();

const Mycar2 = new mycar2(650, "포르쉐", "블랙", 0);
Mycar2.start();
Mycar2.stop();

///// 다시 해보기 밑에 마이카 1 부분이랑 마이카 2 부분의 변수명을 잘못씀

// class car {
//   speed = 0;

//   constructor(spd) {
//     this.speed = spd;
//   }

//   stop = () => {
//     console.log(`브레이크 속도 ${this.speed}으로`);
//   };
// }

// class 마이카1 extends car {
//   constructor(stop) {
//     super(stop);
//   }
//   start = () => {
//     console.log("이건 드라이브용");
//     console.log("출발하자!!");
//   };
// }

// class 마이카2 extends car {
//   constructor(aaa) {
//     super(aaa);
//   }
//   start = () => {
//     console.log("이건 스포츠용");
//     console.log("출발하자!!");
//   };
// }

// const Mycar1 = new 마이카1(0);
// Mycar1.start();
// Mycar1.stop();

// const Mycar2 = new 마이카2(0);
// Mycar2.start();
// Mycar2.stop();
