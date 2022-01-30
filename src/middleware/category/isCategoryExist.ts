import { Request, Response, NextFunction } from 'express';
import customErrorRes from '../../utilites/customError';
import CategoryStore from '../../model/category';

//validate if category is exist or not

export default async (req: Request, res: Response, next: NextFunction) => {
  const category_id: number = parseInt(req.body.category_id);
  const category = await new CategoryStore().show(category_id);

  if (!category) return customErrorRes(res, 400, `Category not found category_id(${category_id})`);
  else next();
};
