import express from 'express';
import handler from '../service/dashboard';

import validateID from '../middleware/general/validateID';

const router = express.Router();
router
  .route('/products/category/:id')
  .get(validateID, handler.productWithCategory);

router.route('/products/popular/').get(handler.popularProduct);

export default router;
