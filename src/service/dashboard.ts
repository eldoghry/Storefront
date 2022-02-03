import { Request, Response } from 'express';
import product from '../interface/product';
import Dashboard from '../model/dashboard';
import customErrorRes from '../utilites/customError';

const productWithCategory = async (req: Request, res: Response) => {
  try {
    const categoryID = parseInt(req.params.category_id);
    const products: product[] = await new Dashboard().productWithCategory(categoryID);

    res.status(200).json({
      status: 'success',
      data: {
        results: products.length,
        products,
      },
    });
  } catch (err) {
    customErrorRes(res, 500, err as string);
  }
};

const popularProduct = async (req: Request, res: Response) => {
  try {
    //queries
    const limit: number = parseInt(req.query.limit as string);
    const sort: string | undefined = req.query.sort as string;
    let finalLimit = 5;
    let finalSort = 'DESC';

    if (sort && ['ASC', 'DESC'].includes(sort.toUpperCase())) {
      finalSort = sort.toUpperCase();
    }

    if (limit && !isNaN(limit) && limit > 0) {
      finalLimit = limit;
    }

    const products: product[] = await new Dashboard().popularProduct(finalLimit, finalSort);

    res.status(200).json({
      status: 'success',
      data: {
        results: products.length,
        products,
      },
    });
  } catch (err) {
    customErrorRes(res, 500, err as string);
  }
};

export default {
  productWithCategory,
  popularProduct,
};
