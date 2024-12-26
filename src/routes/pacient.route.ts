import { Router } from 'express';
import { PacientController } from '../controllers/pacient.controller';

const pacientRouter = Router();
const pacientController = new PacientController();

pacientRouter.get('/history', pacientController.getHistory);

export { pacientRouter };