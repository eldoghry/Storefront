import { Request, Response } from 'express';
import OrderStore from '../model/order';
import order from '../interface/order';
import user from '../interface/user';
import jwt from 'jsonwebtoken';
// import updateorder from '../interface/updateorder';

//importing utilities
import normalizeString from '../utilites/normalizeString';
import customErrorRes from '../utilites/customError';

const index = async (_req: Request, res: Response) => {
  try {
    const orders: order[] = await new OrderStore().index();

    res.status(200).json({
      status: 'success',
      data: { results: orders.length, orders },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: err,
    });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] as string;
    const user: user = jwt.verify(
      token,
      process.env.TOKEN_ACCESS_SECRET as string
    ) as user;

    const newOrder: order = await new OrderStore().create(user.id as number);

    res.status(201).json({
      status: 'success',
      order: newOrder,
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: err,
    });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const order = await new OrderStore().show(id);

    if (!order)
      return customErrorRes(res, 400, `order with id(${id}) not found`);

    res.status(200).json({
      status: 'success',
      order,
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: err,
    });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    await new OrderStore().delete(id);

    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: err,
    });
  }
};

// const update = async (req: Request, res: Response) => {
//   try {
//     const id: number = parseInt(req.params.id);

//     //id will be exist in keys
//     //make sure there is data that should be updated

//     const order = await new OrderStore().update(updateObj);

//     res.status(200).json({
//       status: 'success',
//       order,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'error',
//       error: err,
//     });
//   }
// };

export default {
  index,
  show,
  create,
  destroy,
  // update,
};
