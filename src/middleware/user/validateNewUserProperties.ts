import { Request, Response, NextFunction } from 'express';
import customErrorRes from '../../utilites/customError';

//validate new user properties

export default (req: Request, res: Response, next: NextFunction) => {
  const username: string = req.body.username;
  const firstname: string = req.body.firstname;
  const lastname: string = req.body.lastname;
  const password: string = req.body.password;

  const invalidMsg = [];

  if (!username || typeof username !== 'string')
    invalidMsg.push('username(string)');
  if (!firstname || typeof firstname !== 'string')
    invalidMsg.push('firstname(string)');
  if (!lastname || typeof lastname !== 'string')
    invalidMsg.push('lastname(string)');
  if (!password || typeof password !== 'string')
    invalidMsg.push('password(string)');

  if (invalidMsg.length)
    return customErrorRes(
      res,
      400,
      `${invalidMsg.join(', ')} are required to create new resource`
    );
  else next();
};
