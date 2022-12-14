import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  IUsersServiceCreate,
  IUsersServicefindOne,
} from './interfaces/users-service.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>, //
  ) {}
  //typesctipt 지정하려고 인터페이스 만듬

  findOne({ email }: IUsersServicefindOne): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create({
    email,
    hashedPassword: password, //해시드패스워드를 password에 담는다
    name,
    age,
  }: IUsersServiceCreate): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });

    if (user) throw new ConflictException('이미 등록된 이메일입니다');
    //if(user) throw new HttpException("이미 등록된 이메일입니다",HttpStatus.CONFLICT)

    return this.usersRepository.save({ email, password, name, age });
  }
}
