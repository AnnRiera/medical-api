import { PatientController } from '../controllers/patient.controller';
import { validateToken } from '../middlewares/auth.middleware';
import { Router } from 'express';

const patientRouter = Router();
const patientController = new PatientController();

patientRouter.get('/history', validateToken, patientController.getHistory);

export { patientRouter };