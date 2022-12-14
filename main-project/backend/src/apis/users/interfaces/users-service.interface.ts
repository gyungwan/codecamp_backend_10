import { IAuthUserItem } from 'src/commons/types/context';
import { UpdateUserInput } from '../dto/update-user.input';
import { User } from '../entities/user.entity';

export interface IUsersServiceCreate {
  name: string;
  phone: string;
  email: string;
  // userId: string;
  hashedPassword: string;
  age: number;
}

export interface IUsersServiceUpdate {
  user: User;
  updateUserInput: UpdateUserInput;
}

export interface IUsersServiceFindOne {
  email: string;
}

export interface IUserServiceDelete {
  email: string;
}

export interface IAuthServiceGetAccessToken {
  user: User | IAuthUserItem;
}
