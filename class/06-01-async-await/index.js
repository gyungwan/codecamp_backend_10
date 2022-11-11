import axios from "axios";

// 1. 비동기 방식
function fetchAsync() {
  const result = axios.get("https://koreanjson.com/posts/1");
  console.log("비동기 방식", result); //promise {<pending>}
}

fetchAsync();

// 2. 동기 방식
async function fetchSync() {
  const result = await axios.get("https://koreanjson.com/posts/1");
  console.log("동기 방식", result); // 정상적인 데이터
}

fetchSync();

// 2. 동기 방식 화살표 함수로 바꾸기
const fetchSync = async () => {
  const result = await axios.get("https://koreanjson.com/posts/1");
  console.log("동기 방식", result); // 정상적인 데이터
};

fetchSync();
