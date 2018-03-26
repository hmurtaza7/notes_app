import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

// Get current User
router.route('/user').get(UserController.getUser);

// create a new user
router.route('/user').post(UserController.addUser);

export default router;
