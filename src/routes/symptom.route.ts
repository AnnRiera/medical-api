import { Router } from 'express';
import { validateToken } from '../middlewares/auth.middleware';
import { SymptomController } from '../controllers/symptom.controller';

const symptomRouter = Router();
const symptomController = new SymptomController();

symptomRouter.post('/create', validateToken, symptomController.create);
symptomRouter.get('/list', validateToken, symptomController.list);

export { symptomRouter };