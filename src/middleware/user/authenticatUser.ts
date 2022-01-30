import { Request, Response, NextFunction } from 'express';
import customErrorRes from '../../utilites/customError';
import jwt from 'jsonwebtoken';
import user from '../../interface/user';
import UserStore from '../../model/user';

//check if user is exist in DB and credentials are correct
export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token: string = authHeader?.split(' ')[1] as string;

  const user: user = jwt.verify(token, process.env.TOKEN_ACCESS_SECRET as string) as user;

  if (!(await new UserStore().auth(user.id as number, user.username as string, user.password_digest as string)))
    return customErrorRes(res, 401, `Access Denied! Wrong Credentials or user not exist`);
  else {
    console.log(`User authenicated`);
    next();
  }
};
