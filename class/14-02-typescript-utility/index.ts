//타입을 조작하는타입

interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby: string;
}

// 1. Partial 타입 다 물음표로 바꿔주는
type aaa = Partial<IProfile>;

//
//

// 2. Required 타입 전부다 필수로 바뀜
type bbb = Required<IProfile>;
//
//

// 3. Pick 타입 원하는 키를 뽑아서 ccc에 넣어줌
type ccc = Pick<IProfile, "name" | "age">;
//
//

// 4. Omit 타입 원하는걸 뺴는
type ddd = Omit<IProfile, "school">;
//

// 5. Record 타입  과  Union 타입
type eee = "철수" | "영희 " | "훈이"; //Union 타입
let child: eee;
child = "철수";

//위에 만든 유니온 타입의 철수 영희 훈이를 키로 만들고 밸류로 아이프로필로 만든다
type fff = Record<eee, IProfile>; //Record 타입

type ggg = keyof IProfile; // "name" | "age" | "school" | "hobby"  형태의 객케에서 키값을 가져와서 Union타입을 만들어줌
let myprofile: ggg;
myprofile = "hobby";

//
//
//
///type vs interface 차이
//인터페이스는 선언 병합이 가능
interface IProfile {
  candy: number;
}

let profile: Partial<IProfile> = {
  candy: 100,
};

//타입을 조작하는 타입 유틸리티 타입
