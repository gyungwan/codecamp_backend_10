import { Request, Response } from 'express';

export interface IAuthUserItem {
  email: string;
  id: string;
}

export interface IAuthUser {
  user?;
}

export interface IContext {
  req: Request & IAuthUser;
  res: Response;
}
