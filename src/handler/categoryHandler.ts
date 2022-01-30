import { Request, Response } from 'express';
import categoryStore from '../model/category';
import category from '../interface/category';

//importing utilities
import normalizeString from '../utilites/normalizeString';
import customErrorRes from '../utilites/customError';

const index = async (_req: Request, res: Response) => {
  try {
    const categories: category[] = await new categoryStore().index();

    res.status(200).json({
      status: 'success',
      data: { results: categories.length, categories },
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
    const name: string | undefined = normalizeString(req.body.name);
    if (!name) throw 'Invalid name, must use valid string name';

    const newCategory: category = await new categoryStore().create({ name });

    res.status(201).json({
      status: 'success',
      category: newCategory,
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
    const category = await new categoryStore().show(id);

    if (!category) return customErrorRes(res, 400, `Category with id(${id}) not found`);

    res.status(200).json({
      status: 'success',
      category,
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
    await new categoryStore().delete(id);

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
    const name: string | undefined = normalizeString(req.body.name);

    if (!name) throw 'Invalid name, must use valid string name';

    const category = await new categoryStore().update({ id, name });

    res.status(200).json({
      status: 'success',
      category,
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: err,
    });
  }
};

export default {
  index,
  show,
  create,
  destroy,
  update,
};
