import { UpdateUserInput } from '../dto/update-user.input';
import { User } from '../entities/user.entity';

export interface IUsersServiceCreate {
  name: string;
  phone: string;
  email: string;
  userId: string;
  hashedpassword: string;
}

export interface IUsersServiceUpdate {
  user: User;
  updateUserInput: UpdateUserInput;
}

export interface IUsersServiceFindOne {
  userid: string;
}

export interface IUserServiceDelete {
  userid: string;
}
