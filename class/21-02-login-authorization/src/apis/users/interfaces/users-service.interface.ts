import { User } from '../entities/user.entity';

export interface IUsersServicefindOne {
  email: string;
}

export interface IAuthServiceGetAccessToken {
  user: User;
}

export interface IUsersServiceCreate {
  email: string;
  hashedpassword: string;
  name: string;
  age: number;
}
