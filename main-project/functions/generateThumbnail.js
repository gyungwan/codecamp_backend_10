// import { Storage } from "@google-cloud/storage";
// import { sharp } from "sharp";

//임포트를 해보았으나 안돼서 다른 방법으로 하였습니다 ^_^
const { Storage } = require("@google-cloud/storage");
const sharp = require("sharp");

// event 사진 데이터를 받아오는 선언해준거  event.name 하면 내가 업로드한 이미지 파일의 이름을 알수 있습ㅂ니다 ^-^
exports.Trigger = async (event) => {
  if (event.name.includes("thumb/")) return; //썸 폴더가 있다면 함수가 return으로 종료
  // 사진이 여러개 생성하는걸 방지

  // 사이즈를 배열로 담아서 사용하기 쉽게 해주었다 ^.^
  const size = [
    [320, "s"],
    [640, "m"],
    [1280, "l"],
  ];

  //name에 내가 업로드한 이미지 파일의 이름을 넣어주었다 -_-
  const name = event.name;

  // new Storage() 이건 스토리지를 초기화해주고 그 안에 event.bucket 폴더명 대신에 넣어준다.
  const storage = new Storage().bucket(event.bucket);

  //map 함수를 이용해서
  await Promise.all(
    size.map(([size, dir]) => {
      return new Promise((resolve, reject) => {
        storage

          .file(name) //버킷에 저장될 파일명을 name로 해준다 ^ ^

          .createReadStream() // storage에는 createReadStream()함수가 있기 때문에  storage.createReadStream()을 사용해서 해당 파일을 읽어옵니다 -.-

          .pipe(sharp().resize({ width: size })) //저장된 파일의 사이즈를 resize함수를 이용해서 위에서 배열로 담아준 sized의 width 위에 담아준 배열의 사이즈로 만들어줍니다.

          .pipe(storage.file(`thumb/${dir}/${name}`).createWriteStream()) //createWriteStream()로 storage.file(`thumb/${dir}/${name}`) thumb 라는 폴더를 만들고  그 안에 dir(s,m,l)으로 폴더를 만들고 안에  ${name}으로 파일을 만들어줌

          .on("finish", () => resolve()) //on을 기준으로 성공일 경우resolve를 사용해서 경로를 반환한다
          .on("error", () => reject()); //on을 기준으로 실패, error일때 reject를 사용해서 error를 반환
      });
    })
  );
};
