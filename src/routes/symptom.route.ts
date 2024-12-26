import { Router } from 'express';
import { SymptomController } from '../controllers/symptom.controller';

const symptomRouter = Router();
const symptomController = new SymptomController();

symptomRouter.post('/create', symptomController.create);
symptomRouter.get('/list', symptomController.list);

export { symptomRouter };