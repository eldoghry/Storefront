import express from 'express';
import handler from '../handler/orderHandler';

//importing middlewares
import isAuthTokenExist from '../middleware/user/isAuthTokenExist';
import isAuthTokenValid from '../middleware/user/isAuthTokenValid';
import authenticatUser from '../middleware/user/authenticatUser';
import validateID from '../middleware/general/validateID';
//import validateNewProductParams from '../middleware/product/validateNewProductParams';
// import isCategoryExist from '../middleware/category/isCategoryExist';
// import validateUpdateProductParams from '../middleware/product/validateUpdateProductParams';

const router = express.Router();
const checkAuthToken = [isAuthTokenExist, isAuthTokenValid, authenticatUser]; //user exist, credientials correct

router.route('/').get(handler.index).post(checkAuthToken, handler.create);
router
  .route('/:id')
  .get(validateID, handler.show)
  .delete(validateID, checkAuthToken, handler.destroy);
// .patch(validateID, checkAuthToken, handler.update);

export default router;
