import { Request, Response, NextFunction } from 'express';
import customErrorRes from '../../utilites/customError';
import jwt from 'jsonwebtoken';
import user from '../../interface/user';

//check permissions
//check if token belonge to user by validate id

export default (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id as string);
  const authHeader = req.headers.authorization;
  const token: string = authHeader?.split(' ')[1] as string;

  const user = jwt.verify(token, process.env.TOKEN_ACCESS_SECRET as string) as user;

  if (user.id !== id) return customErrorRes(res, 403, `Forbiden!. Token not belong to this user`);
  else {
    console.log(`User authorized`);
    next();
  }
};
