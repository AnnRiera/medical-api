import { Router } from 'express';
import { diagnosisSchema } from '../schemas/main.schema';
import { validateToken } from '../middlewares/auth.middleware';
import { validateData } from '../middlewares/validator.middleware';
import { diagnosisHandler } from '../middlewares/diagnosis.middleware';
import { DiagnosisController } from '../controllers/diagnosis.controller';

const diagnoseRouter = Router();
const diagnosisController = new DiagnosisController();

diagnoseRouter.post('/create', validateToken, validateData(diagnosisSchema), diagnosisHandler, diagnosisController.create);
diagnoseRouter.get('/list', validateToken, diagnosisController.list);

export { diagnoseRouter };