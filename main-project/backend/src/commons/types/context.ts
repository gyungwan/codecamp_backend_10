import { Request, Response } from 'express';

export interface IAuthProduct {
  product?: IAuthProductItem;
}
export interface IAuthProductItem {
  productName: string;
  id: string;
}

export interface IProductContext {
  req: Request & IAuthProduct;
  res: Response;
}

export interface IAuthUser {
  user?: IAuthUserItem;
}

export interface IAuthUserItem {
  email: string;
  id: string;
}

export interface IUserContext {
  req: Request & IAuthUser;
  res: Response;
}

// import { Request, Response } from 'express';
// export interface IAuthUserItem {
//   user?: {
//     email: string;
//     id: string;
//   };
// }
// export interface IAuthUser {
//   user?: IAuthUserItem;
// }
// export interface IContext {
//   req: Request & IAuthUser;
//   res: Response;
// }
