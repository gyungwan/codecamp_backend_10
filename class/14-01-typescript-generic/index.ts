//1. 기본 문자/숫자/불린 기본타입
const getPrimitive = (arg1: string, arg2: number, arg3: boolean): [boolean, number, string] => {
  return [arg3, arg2, arg1];
};
const result1 = getPrimitive("철수", 123, true);

//
//
//
//2. any 기본타입(그냥 자바스크립트와 같은)
const getAny = (arg1: any, arg2: any, arg3: any): [any, any, any] => {
  console.log(arg1 + 100); //any는 아무거나 다됨
  return [arg3, arg2, arg1];
};
const result2 = getAny("철수", 123, true);

//
//
//
//3. unknown 타입 any 타입과 비슷한데 좀더 안전한 결과를 예측 못함
const getUnknown = (arg1: unknown, arg2: unknown, arg3: unknown): [unknown, unknown, unknown] => {
  if (typeof arg1 === "number") console.log(arg1 + 100);
  return [arg3, arg2, arg1];
};
const result3 = getUnknown("철수", 123, true);
//
//
//
//4. generic 타입
function getGeneric<MyType1, MyType2, MyType3>(arg1: MyType1, arg2: MyType2, arg3: MyType3): [MyType3, MyType2, MyType1] {
  //any긴 any 인데 타입을
  return [arg3, arg2, arg1];
}
const result4 = getGeneric<string, number, boolean>("철수", 123, true);
//타입을 위에 처럼 명시해줄수 있다  명시를 안해주면  들어가는 데이터 타입을 보고  타입이 정해짐
//

//
//
//5. generic 타입 - 2
//타입 이름을 내마음대로 정할수 있다
function getGeneric2<T1, T2, T3>(arg1: T1, arg2: T2, arg3: T3): [T3, T2, T1] {
  //any긴 any 인데 타입을
  return [arg3, arg2, arg1];
}
const result5 = getGeneric2<string, number, boolean>("철수", 123, true);
//타입을 위에 처럼 명시해줄수 있다  명시를 안해주면  들어가는 데이터 타입을 보고  타입이 정해짐

//
//
//6. generic 타입 - 3
//타입 이름을 내마음대로 정할수 있다
function getGeneric3<T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] {
  //any긴 any 인데 타입을
  return [arg3, arg2, arg1];
}
const result6 = getGeneric3<string, number, boolean>("철수", 123, true);
//타입을 위에 처럼 명시해줄수 있다  명시를 안해주면  들어가는 데이터 타입을 보고  타입이 정해짐

//
//
//7. generic 타입 - 4
//타입 이름을 내마음대로 정할수 있다
const getGeneric4 = <T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] => {
  //any긴 any 인데 타입을
  return [arg3, arg2, arg1];
};
const result7 = getGeneric4<string, number, boolean>("철수", 123, true);
//타입을 위에 처럼 명시해줄수 있다  명시를 안해주면  들어가는 데이터 타입을 보고  타입이 정해짐
