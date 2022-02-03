//import modules
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

//import models & interfaces
import OrderStore from '../model/order';
import order from '../interface/order';
import user from '../interface/user';

//importing utilities
import customErrorRes from '../utilites/customError';
import getUserFromToken from '../utilites/getUserFromToken';

const index = async (req: Request, res: Response) => {
  try {
    const token: string = req.headers.authorization?.split(' ')[1] as string;
    const user: user = getUserFromToken(token);

    const orders: order[] = await new OrderStore().index(user.id as number);

    res.status(200).json({
      status: 'success',
      data: { results: orders.length, orders },
    });
  } catch (err) {
    customErrorRes(res, 500, err as string);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] as string;
    const user: user = jwt.verify(token, process.env.TOKEN_ACCESS_SECRET as string) as user;

    const newOrder: order = await new OrderStore().create(user.id as number);

    res.status(201).json({
      status: 'success',
      order: newOrder,
    });
  } catch (err) {
    customErrorRes(res, 500, err as string);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    //1) get & validate if order exist
    const id: number = parseInt(req.params.id);
    const order = await new OrderStore().show(id);

    if (!order) return customErrorRes(res, 400, `order with id(${id}) not found`);

    const token: string = req.headers.authorization?.split(' ')[1] as string;
    const user = getUserFromToken(token);

    if (user.id != (order.user_id as number))
      return customErrorRes(res, 401, `You don't have previlige to access this resourse`);

    //2) return full cart of this order
    const cart = await new OrderStore().cart(id);

    res.status(200).json({
      status: 'success',
      order,
      cart,
    });
  } catch (err) {
    customErrorRes(res, 500, err as string);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);

    await new OrderStore().delete(id);

    res.sendStatus(204);
  } catch (err) {
    customErrorRes(res, 500, err as string);
  }
};

// only update operation is changing status
const update = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const status: string = req.body.status;

    //1) validate status
    if (!status || !['active', 'complete'].includes(status))
      return customErrorRes(res, 401, `status is required and must be (active or complete)`);

    //2) check if order not empty
    const cart = await new OrderStore().cart(id);

    if (!cart.length && status === 'complete') return customErrorRes(res, 400, `can't complete empty order`);

    //3) update order
    const updatedOrder = await new OrderStore().update(id, status);

    res.status(200).json({
      status: 'success',
      order: updatedOrder,
    });
  } catch (err) {
    customErrorRes(res, 500, err as string);
  }
};

//cart post orders/1/products
const addProduct = async (req: Request, res: Response) => {
  try {
    const orderID: number = parseInt(req.params.id);
    const productID = parseInt(req.body.product_id);
    const quantity = parseInt(req.body.quantity);

    //1) validate product id, quantity is exist and valid
    const invalidMsg = [];
    if (!productID || typeof productID !== 'number' || productID < 1) invalidMsg.push('productID(number)');
    if (!quantity || typeof quantity !== 'number') invalidMsg.push('quantity(number)');
    if (invalidMsg.length)
      return customErrorRes(res, 400, `${invalidMsg.join(', ')} are required to add products to order(${orderID})`);

    //validate if order already exist
    const order = await new OrderStore().show(orderID);

    if (order && order.status === 'complete')
      return customErrorRes(res, 400, `cannot add products to completed order(${orderID})`);

    //2) update order
    const orderProduct = await new OrderStore().addProduct(orderID, productID, quantity);

    //3) return full cart
    const cart = await new OrderStore().cart(orderID);

    res.status(201).json({
      status: 'success',
      cart: {
        order,
        products: cart,
      },
    });
  } catch (err) {
    customErrorRes(res, 500, err as string);
  }
};

export default {
  index,
  show,
  create,
  destroy,
  update,
  addProduct,
};
