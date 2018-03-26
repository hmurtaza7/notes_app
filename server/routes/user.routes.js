import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

// register a new user
router.route('/users/register').post(UserController.addUser);

// login user
router.route('/users/login').post(UserController.loginUser);

router.route('/users/protected').post(UserController.checkAuth);

export default router;
