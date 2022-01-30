import { Request, Response, NextFunction } from 'express';
import customErrorRes from '../../utilites/customError';

//validate id is number and > 0

export default (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (Number.isFinite(id) && id > 0) next();
  else return customErrorRes(res, 400, `Invalid ID: id must be integer and > 0`);
};
