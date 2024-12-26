import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateToken } from '../middlewares/auth.middleware';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/create', userController.create);
userRouter.post('/login',  userController.login);

export { userRouter };