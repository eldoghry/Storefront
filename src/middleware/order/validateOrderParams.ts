import { Request, Response, NextFunction } from 'express';
import customErrorRes from '../../utilites/customError';

//validate new product params

export default (req: Request, res: Response, next: NextFunction) => {
  const status: string = req.body.status;

  if (!status || !['active', 'complete'].includes(status))
    return customErrorRes(
      res,
      400,
      `status is required and must be (active or complete)`
    );
  else next();
};
