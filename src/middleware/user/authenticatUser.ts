import { Request, Response, NextFunction } from 'express';
import customErrorRes from '../../utilites/customError';
import jwt from 'jsonwebtoken';
import user from '../../interface/user';
import UserStore from '../../model/user';

//check if user is exist in DB and credentials are correct
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    const token: string = authHeader?.split(' ')[1] as string;

    const user: user = jwt.verify(token, process.env.TOKEN_ACCESS_SECRET as string) as user;

    const isAuthenicated: boolean = await new UserStore().auth(user.username as string, user.password_digest as string);

    console.log(`isAuthenicated: ${isAuthenicated}`);

    if (!isAuthenicated) return customErrorRes(res, 401, `Access Denied! Wrong Credentials or user not exist`);
    else next();
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
