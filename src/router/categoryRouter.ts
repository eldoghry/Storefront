import express from 'express';
import handler from '../handler/categoryHandler';

//importing middlewares
import isAuthTokenExist from '../middleware/isAuthTokenExist';
import isAuthTokenValid from '../middleware/isAuthTokenValid';
import authenticatUser from '../middleware/authenticatUser';

const router = express.Router();
const checkAuthToken = [isAuthTokenExist, isAuthTokenValid, authenticatUser]; //user exist, credientials correct

router.route('/').get(handler.index).post(checkAuthToken, handler.create);
router.route('/:id').get(handler.show).delete(checkAuthToken, handler.destroy).patch(checkAuthToken, handler.update);

export default router;
