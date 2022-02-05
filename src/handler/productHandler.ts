import { Request, Response } from 'express';
import ProductStore from '../model/product';
import product from '../interface/product';
import updateProduct from '../interface/updateProduct';

//importing utilities
import normalizeString from '../utilites/normalizeString';
import customErrorRes from '../utilites/customError';

const index = async (_req: Request, res: Response) => {
  try {
    const products: product[] = await new ProductStore().index();

    res.status(200).json({
      status: 'success',
      data: { results: products.length, products },
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
    const name: string = normalizeString(req.body.name) as string;
    const price: number = parseInt(req.body.price);
    const category_id: number = parseInt(req.body.category_id);

    const newProduct: product = await new ProductStore().create({
      name,
      price,
      category_id,
    });
    res.status(201).json({
      status: 'success',
      product: newProduct,
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
    const product = await new ProductStore().show(id);

    if (!product) return customErrorRes(res, 400, `product with id(${id}) not found`);

    res.status(200).json({
      status: 'success',
      product,
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

    await new ProductStore().delete(id);

    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: err,
    });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const updateObj: updateProduct = createUpdateObject({
      id,
      ...req.body,
    });

    //id will be exist in keys
    //make sure there is data that should be updated
    const shouldUpdate: boolean = Object.keys(updateObj).length > 1;

    const product = shouldUpdate ? await new ProductStore().update(updateObj) : await new ProductStore().show(id);

    res.status(200).json({
      status: 'success',
      product,
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: err,
    });
  }
};

//helper function
const createUpdateObject = (obj: updateProduct): updateProduct => {
  const final: updateProduct = {};

  if (obj.id) final.id = obj.id;
  if (obj.name) final.name = obj.name;
  if (obj.price) final.price = obj.price;
  if (obj.category_id) final.category_id = obj.category_id;

  return final;
};

export default {
  index,
  show,
  create,
  destroy,
  update,
};
