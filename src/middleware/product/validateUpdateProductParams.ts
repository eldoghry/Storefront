import { Request, Response, NextFunction } from 'express';
import customErrorRes from '../../utilites/customError';

//validate new product params

export default (req: Request, res: Response, next: NextFunction) => {
  const name: string | undefined = req.body.name ? req.body.name : undefined;
  const price: number | undefined = req.body.price ? req.body.price : undefined;
  const category_id: number | undefined = req.body.category_id
    ? parseInt(req.body.category_id)
    : undefined;

  const invalidMsg = [];

  if (name && typeof name !== 'string') invalidMsg.push('name(string)');
  if (price && typeof price !== 'number') invalidMsg.push('price(number)');
  if (category_id && typeof category_id !== 'number')
    invalidMsg.push('category_id(number)');

  if (invalidMsg.length)
    return customErrorRes(
      res,
      400,
      `${invalidMsg.join(', ')} are required to update product`
    );
  else next();
};
