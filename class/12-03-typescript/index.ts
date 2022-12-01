//타입 추론 처음에 들어간 값의 타입으로 지정되서

let aaa = "안녕하세요";
aaa = 10;

//타입 명시
let bbb: string = "반갑습니다";
bbb = 10;

//타입명시가 필요한 상황
let ccc: number | string = 1000;
ccc = "1000원";

//숫자타입
let ddd: number = 10;
ddd = "훈이";

//불린타입
let eee: boolean = true;
eee = false;
eee = "false"; //문자열안에 어떠한 게 들어가 있으면 true 반환

//배열 타입
let fff: number[] = [1, 2, 3, 4, 5, "안녕하세요"];
let ggg: string[] = ["철수", "훈이", "맹구", "짱구"];
let hhh: (string | number)[] = ["철수", "훈이", "맹구", "짱구", 10, 20]; //타입을 추론해서 어떤 타입을 쓰는지 알아보기

//객체 타입
interface IProfile {
  name: string;
  age: number | string;
  school: string;
  hobby?: string; //?있어도 되고 없어도 되고
}

const profile: IProfile = {
  name: "맹구",
  age: 8,
  school: "공룡초등학교",
};

profile.name = "훈이"; // 타입 추론으로 인해 이것만 가능
profile.age = "8";
profile.hobby = "수영";

//함수 타입 =>어디서 몇번이든 호출이 가능해서 타입추론 할수 없음 (반드시 타입 명시 필요)
function add(num1: number, num2: number, unit: string): string {
  return num1 + num2 + unit;
}
const result = add(1000, 2000, "원"); //결과의 리턴 타입도  예측 가능!!

const add2 = (num1: number, num2: number, unit: string): string => {
  return num1 + num2 + unit;
};
const result2 = add2(1000, 2000, "원"); //결과의 리턴 타입도  예측 가능!!

//any 타입
let qqq: any = "철수"; // 자바스크립트와 동일
qqq = 123;
qqq = true;
