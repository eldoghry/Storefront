import { Request, Response, NextFunction } from 'express';
import customErrorRes from '../../utilites/customError';
import jwt from 'jsonwebtoken';

//check if header contain valid token

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token: string = authHeader?.split(' ')[1] as string;

  //valid token ?
  jwt.verify(token, process.env.TOKEN_ACCESS_SECRET as string, (err, _u) => {
    if (err) return customErrorRes(res, 401, `invalid token!, ${err}`);
    else next();
  });
};
