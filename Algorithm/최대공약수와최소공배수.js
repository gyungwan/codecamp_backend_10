// 최대공약수와 최소공배수
// 문제 설명
// 두 수를 입력받아 두 수의 최대공약수와 최소공배수를 반환하는 함수, solution을 완성해 보세요. 배열의 맨 앞에 최대공약수, 그다음 최소공배수를 넣어 반환하면 됩니다. 예를 들어 두 수 3, 12의 최대공약수는 3, 최소공배수는 12이므로 solution(3, 12)는 [3, 12]를 반환해야 합니다.

// 제한 사항
// 두 수는 1이상 1000000이하의 자연수입니다.
// 입출력 예
// n	m	return
// 3	12	[3, 12]
// 2	5	[1, 10]
// 입출력 예 설명
// 입출력 예 #1
// 위의 설명과 같습니다.

// 입출력 예 #2
// 자연수 2와 5의 최대공약수는 1, 최소공배수는 10이므로 [1, 10]을 리턴해야 합니다.

///////
function solution(n, m) {
  //최대공약수 : 두개 이상의 수가 공통으로 가지는 약수 중에서 가장큰수
  //최소공배수 두개 이상의 수가 공통으로 가지는 배수중에서 가장작은수
  //최대공약수 구하기
  let max = 0; //공약수중에서 제일 큰 값
  for (let i = 1; i <= m; i++) {
    if (n % i === 0 && m % i === 0) {
      max = i;
    }
  }
  //최소공배수 구하기
  let min = 0; //공배수 중에서 제일 작은 값
  for (let i = m; i <= n * m; i += m) {
    if (i % n === 0) {
      min = i;
      break;
    }
  }
  return [max, min];
}

solution(3, 12);
solution(2, 5);

////
function solution(n, m) {
  //유클리드 호제법
  // - 최대공약수를 수하기 위한 알고리즘 (공식)

  //a와 b 란 숫자가 있을때
  //1. a를 b로 나누었을떄, (a> b, 큰수를 더 작은 수로 나우었을떼  )
  //2-1. 나머지 값(c)이 0이 되면 , 작은 수(b)가최대공약수가 된다
  //2-2. 나머지 값(c)이 되면  0이 아니라면, b를 c로 나눈다. (1번과정분더 반복)
  //반복 후에 나머지 값이 0이 나온는 경우를 만난다면  작은수(b)가 최대공약수가 된다.

  let a = Math.max(m, n); // 큰수 담기게
  let b = Math.min(n, m); //작은수 담기게
  let c = 0; // a를 b로 나눴을때의 나머지 값

  while (a % b > 0) {
    c = a % b; //큰수에서 작은수를 나눈 나머지 값을 저장
    a = b; //큰수는 나눴을 때의 더 작은 수를 가져온다
    b = c; // 작은수에는 나머지 값을 가져온다
  }
  //최소공배수 : n과m을 곱한 값을 최대공약수로 나눠준 값
  return [b, (n * m) / b];
}
