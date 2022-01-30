import { Request, Response, NextFunction } from 'express';
import customErrorRes from '../../utilites/customError';

//validate new user properties

export default (req: Request, res: Response, next: NextFunction) => {
  const username: string = req.body.username;
  const firstname: string = req.body.firstname;
  const lastname: string = req.body.lastname;
  const password: string = req.body.password;

  if (!username || !firstname || !lastname || !password)
    return customErrorRes(res, 400, 'Cannot create user, Invalid body properties');
  else next();
};
