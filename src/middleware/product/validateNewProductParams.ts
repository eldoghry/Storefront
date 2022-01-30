import { Request, Response, NextFunction } from 'express';
import customErrorRes from '../../utilites/customError';

//validate new product params

export default (req: Request, res: Response, next: NextFunction) => {
  const name: string = req.body.name;
  const price: number = req.body.price;
  const category_id: number = parseInt(req.body.category_id);

  const invalidMsg = [];

  if (!name || typeof name !== 'string') invalidMsg.push('name(string)');
  if (!price || typeof price !== 'number') invalidMsg.push('price(number)');
  if (!category_id || typeof category_id !== 'number') invalidMsg.push('category_id(number)');

  if (invalidMsg.length) return customErrorRes(res, 400, `${invalidMsg.join(', ')} are required to create new product`);
  else next();
};
