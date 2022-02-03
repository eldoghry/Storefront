import express from 'express';
import handler from '../handler/orderHandler';

//importing middlewares
import isAuthTokenExist from '../middleware/user/isAuthTokenExist';
import isAuthTokenValid from '../middleware/user/isAuthTokenValid';
import authenticatUser from '../middleware/user/authenticatUser';
import validateID from '../middleware/general/validateID';
import validateOrderAndUser from '../middleware/order/validateOrderAndUser';

const router = express.Router();
const checkAuthToken = [isAuthTokenExist, isAuthTokenValid, authenticatUser]; //user exist, credientials correct

router.route('/').get(checkAuthToken, handler.index).post(checkAuthToken, handler.create);

router
  .route('/:id')
  .get(validateID, checkAuthToken, validateOrderAndUser, handler.show)
  .delete(validateID, checkAuthToken, validateOrderAndUser, handler.destroy)
  .patch(validateID, checkAuthToken, validateOrderAndUser, handler.update);

router.route('/:id/products').post(validateID, checkAuthToken, validateOrderAndUser, handler.addProduct);

export default router;
