import { Router } from 'express';
import { DiagnosisController } from '../controllers/diagnosis.controller';

const diagnoseRouter = Router();
const diagnoseController = new DiagnosisController();

diagnoseRouter.post('/create', diagnoseController.create);
diagnoseRouter.get('/list', diagnoseController.list);

export { diagnoseRouter };