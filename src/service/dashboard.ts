import { Request, Response } from 'express';
import product from '../interface/product';
import Dashboard from '../model/dashboard';

const productWithCategory = async (req: Request, res: Response) => {
  try {
    const categoryID = parseInt(req.params.category_id);
    const products: product[] = await new Dashboard().productWithCategory(
      categoryID
    );

    res.status(200).json({
      status: 'success',
      data: {
        results: products.length,
        products,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: err,
    });
  }
};

export default {
  productWithCategory,
};
