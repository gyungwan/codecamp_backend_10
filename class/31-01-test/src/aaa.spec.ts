// 1. 한개 테스트하기
it('더하기 테스트', () => {
  const a = 1;
  const b = 2;

  expect(a + b).toBe(3);
});

// 2. 여러개 묶음으로 테스트하기

describe('나의 테스트 그룹', () => {
  it('더하기 테스트', () => {
    const a = 1;
    const b = 2;

    expect(a + b).toBe(3);
  });

  it('곱하기 테스트', () => {
    const a = 1;
    const b = 2;

    expect(a * b).toBe(2);
  });
});

// 3. 상품 구매하기 테스트 예제
describe('상품 구매 테스트', () => {
  // beforeAll(() => {}); //모든 it글 실핼하기전에 딱 1번 실행(예, 로그인)

  //beforeEach(()=>{}) // 가각의 it들 실행하기 전에 매번 실행하고 초기화를 반복

  beforeEach(() => {
    //각 it에서 사용할 초기값 설정
  });

  it('돈 검증하기', () => {
    //사전로직 (로그인)
    const result = true; //돈이 충분하다고 가정
    expect(result).toBe(true);
  });

  it('삼품 구매하기', () => {
    const result = true; // 상품 구매했다고 가정
    expect(result).toBe(true);
  });
});
