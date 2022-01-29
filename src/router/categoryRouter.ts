import express from 'express';
import handler from '../handler/categoryHandler';

//importing middlewares
import isAuthTokenExist from '../middleware/isAuthTokenExist';
import isAuthTokenValid from '../middleware/isAuthTokenValid';
import authenticatUser from '../middleware/authenticatUser';
import validateID from '../middleware/validateID';

const router = express.Router();
const checkAuthToken = [isAuthTokenExist, isAuthTokenValid, authenticatUser]; //user exist, credientials correct

router.route('/').get(handler.index).post(checkAuthToken, handler.create);
router
  .route('/:id')
  .get(validateID, handler.show)
  .delete(validateID, checkAuthToken, handler.destroy)
  .patch(validateID, checkAuthToken, handler.update);

export default router;
