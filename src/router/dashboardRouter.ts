import express from 'express';
import handler from '../service/dashboard';

const router = express.Router();

router.route('/products/category/:category_id').get(handler.productWithCategory);

router.route('/products/popular/').get(handler.popularProduct);

export default router;
