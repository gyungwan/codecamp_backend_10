import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { IFilesServiceUpload } from './interfaces/files-service.interface';

@Injectable()
export class FilesService {
  async upload({ files }: IFilesServiceUpload): Promise<string[]> {
    //console.log(files);

    const watedFiles = await Promise.all(files);
    // 1. 파일을 클라우드 스토리지에 저장하는 로직

    //1-1) 스토리지 셋팅하기
    const bucket = 'codecamp-storage-wan';
    const storage = new Storage({
      projectId: 'eternal-impulse-370212',
      keyFilename: '/my-secret/gcp-file-storage.json',
    }).bucket(bucket);

    // 1-2) 스토리지에 파일 올리기

    const results = await Promise.all(
      watedFiles.map(
        //
        (el) =>
          new Promise<string>((resolve, reject) => {
            el.createReadStream()
              .pipe(storage.file(el.filename).createWriteStream())
              .on('finish', () => resolve(`${bucket}/${el.filename}`))
              .on('erroe', () => reject('실패'));
          }),
      ),
    );

    // file
    //   .createReadStream() //파일을 읽고
    //   .pipe(storage.file(file.filename).createWriteStream()) //이 로직을 실행시킨다  // pip 꼭 있어야함 그래야 실행이 됨
    //   .on('finish', () => console.log('성공'))
    //   .on('error', () => console.log('실패'));

    // 2. 다운로드URL을 브라우저에 돌려주기
    console.log(results);
    return results;
  }
}
