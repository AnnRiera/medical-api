import { userRegistrationSchema, userLoginSchema } from '../schemas/main.schema';
import { validateData } from '../middlewares/validator.middleware';
import { UserController } from '../controllers/user.controller';
import { Router } from 'express';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/create',
    validateData(userRegistrationSchema),
    userController.create
);
userRouter.post('/login',
    validateData(userLoginSchema),
    userController.login);

export { userRouter };