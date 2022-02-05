import { Request, Response, NextFunction } from 'express';
import customErrorRes from '../../utilites/customError';

//validate new user properties

export default (req: Request, res: Response, next: NextFunction) => {
  const username: string = req.body.username;
  const password: string = req.body.password;

  const invalidMsg = [];

  if (!username || typeof username !== 'string') invalidMsg.push('username(string)');
  if (!password || typeof password !== 'string') invalidMsg.push('password(string)');

  if (invalidMsg.length) return customErrorRes(res, 400, `${invalidMsg.join(', ')} are required to create new resource`);
  else next();
};
