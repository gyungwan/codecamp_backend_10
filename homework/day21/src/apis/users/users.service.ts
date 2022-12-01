import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  IUserServiceDelete,
  IUsersServiceCreate,
  IUsersServiceFindOne,
  IUsersServiceUpdate,
} from './interfaces/users-service.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>, //
  ) {}
  async create({
    name,
    phone,
    email,
    userId,
    hashedpassword: password,
  }: IUsersServiceCreate): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });
    if (user) throw new ConflictException('이미 등록된 이메일입니다.');

    return this.usersRepository.save({ name, phone, email, userId, password });
  }
  async update({ user, updateUserInput }: IUsersServiceUpdate) {
    const result = await this.usersRepository.save({
      ...user,
      ...updateUserInput,
    });
    return result;
  }
  findAll(): Promise<User[]> {
    return this.usersRepository.find({});
  }
  findOne({ userid }: IUsersServiceFindOne): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        id: userid,
      },
    });
  }

  async delte({ userid }: IUserServiceDelete): Promise<boolean> {
    const result = await this.usersRepository.softDelete({ id: userid });

    return result.affected ? true : false;
  }
}
