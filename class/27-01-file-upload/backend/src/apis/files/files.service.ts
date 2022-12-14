import { Injectable } from '@nestjs/common';
import { IFilesServiceUpload } from './interdaces/files-service.imterface';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class FilesService {
  upload({ file }: IFilesServiceUpload): string {
    console.log(file);

    // 1. 파일을 클라우드 스토리지에 저장하는 로직

    //1-1) 스토리지 셋팅하기
    const storage = new Storage({
      projectId: '프로젝트아이디',
      keyFilename: '암호파일 이름',
    }).bucket('내가만든버킷명');

    // 1-2) 스토리지에 파일 올리기
    file
      .createReadStream() //파일을 읽고
      .pipe(storage.file(file.filename).createWriteStream()) //이 로직을 실행시킨다  // pip 꼭 있어야함 그래야 실행이 됨
      .on('finish', () => console.log('성공'))
      .on('error', () => console.log('실패'));

    // 2. 다운로드URL을 브라우저에 돌려주기

    return '강아지.jps';
  }
}
