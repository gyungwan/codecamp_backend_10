import axios from "axios";
import cheerio from "cheerio";

const aaa = async () => {
  //axios.get 요청으로 html 코드 받아오기 => 스크래핑(scraping)
  const result = await axios.get("https://naver.com");
  console.log(result.data);
};
// aaa();

const createMessage = async () => {
  //입력된 메세지:"안녕하세여 ~ https://www.naver.com 에 방문해 주세요!"

  //1. 입력된 메세지에서 http로 시작한는 문장이 있는지 먼저 찾기 !(.find()등의 알고리즘 사용하기)
  const url = "https://www.naver.com";

  //2.axios.get 로 요청해서 html코드 받아오기 => 스크래핑
  const result = await axios.get(url);
  console.log(result.data);

  //3. 스크래핑한 결과 (result)에서 og(오픈그래드) 코드 골라내서 변수에 저장
  const $ = cheerio.load(result.data);
  $("meta").each((i, el) => {
    if ($(el).attr("property") && $(el).attr("property").includes("og:")) {
      const key = $(el).attr("property"); //    og:title,  og:description, ....
      const value = $(el).attr("content"); //네이버, 네이버 메인에서~~,
      console.log(key, value);
    }
  });
};

createMessage();
