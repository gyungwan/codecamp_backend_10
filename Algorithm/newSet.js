//Set객체 생성자 중복값을 허용하지 않는 객체
//배열의 형태는 아니지만 배열에 쓰이는 메소드들을 사용할수 있음

// const newSet = new Set([1,2,3,3,3,])
// newSet

// // 1. 배열의 형태를 가지는 테이터
// typeof newSet

// //배열인지 아닌지 확인하는 메소드 []배열을 넣으면 true 값 반환
// Array.isArray([])
// Array.isArray(newSet)

// //2. 고유한 값만 저장 중복 데이터를 허용하지 않음

// //3.데이터를 추가 할수 있음  push같은 여기서는 add

// newSet.add(4)

// // 4. 데이터 삭제도 가능 delete
// newSet.delete(2)

// newSet

// //4. 데이터 조회 가능

// newSet.has(5)

// // 5.데이터 길이 조회
// newSet.size

// //데이터 리셋
// newSet.clear()
// newSet

// //newSet를 배열로 만들어주는
// [...newSet]
// Array.from(newSet)
