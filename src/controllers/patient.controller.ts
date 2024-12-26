import { Response } from 'express';
import { PatientService } from '../services/patient.service';
import { ICustomRequest } from '../interfaces/main.interface';
import { InternalError } from '../errors/intersalServer.error';

const patientService = new PatientService();

class PatientController {
    public async getHistory(
        req: ICustomRequest,
        res: Response
    ) {
        const { user } = req.headers;
        try {
            const data = await patientService.getHistory(user!.id);
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
            throw new InternalError();
        }
    };
}

export { PatientController };