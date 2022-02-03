import { Request, Response, NextFunction } from 'express';
import OrderStore from '../../model/order';
import customErrorRes from '../../utilites/customError';
import getUserFromToken from '../../utilites/getUserFromToken';

//validate if order exist or not and validate if order belong to user

export default async (req: Request, res: Response, next: NextFunction) => {
  const id: number = parseInt(req.params.id);
  const token: string = req.headers.authorization?.split(' ')[1] as string;
  const user = getUserFromToken(token);

  //1) validate if order is exist
  const order = await new OrderStore().show(id);
  if (!order) return customErrorRes(res, 400, `order with id(${id}) not found`);

  //2) validate if order belong to user
  if (order.user_id !== user.id) return customErrorRes(res, 401, `You don't have previlige to access this resourse`);

  next();
};
