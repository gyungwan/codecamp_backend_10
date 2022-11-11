//몽구스 독스 내용 가져오는거
import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  writer: String,
  title: String,
  contents: String,
});
//보드 컬렉센 만든거
export const Board = mongoose.model("Board", boardSchema);

// //db에 저장
// Board.insert({})
// //db에서 조회
// Board.find()
