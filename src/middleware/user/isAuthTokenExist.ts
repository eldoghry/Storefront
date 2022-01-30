import { Request, Response, NextFunction } from 'express';
import customErrorRes from '../../utilites/customError';
import jwt from 'jsonwebtoken';

//check if header contain token

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  //token exist ?
  if (!token) return customErrorRes(res, 400, 'Invalid or Missing Bearer Token');
  else next();
};
