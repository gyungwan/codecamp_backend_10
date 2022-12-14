import { User } from '../entities/user.entity';

export interface IUsersServicefindOne {
  email: string;
}

// export interface IAuthServiceGetAccessToken {
//   user: User;
// }

export interface IUsersServiceCreate {
  email: string;
  hashedPassword: string;
  name: string;
  age: number;
}
