import { Router } from 'express';
import { userRouter } from './user.route';
import { diagnoseRouter } from './diagnosis.route';
import { symptomRouter } from './symptom.route';
import { pacientRouter } from './pacient.route';

const router = Router();

router.use('/user', userRouter);
router.use('/diagnosis', diagnoseRouter);
router.use('/symptom', symptomRouter);
router.use('/pacient', pacientRouter);

export { router };