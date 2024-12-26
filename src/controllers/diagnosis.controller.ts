import { Request, Response } from 'express';
import { DiagnosisService } from '../services/diagnosis.service';
import { InternalError } from '../errors/intersalServer.error';
import { Utils } from '../utility/utils';
import { IFormattedSymptom, ICustomRequest } from '../interfaces/main.interface';

const diagnoseService = new DiagnosisService();
const utils = new Utils();

class DiagnosisController {
    public async create(
        req: ICustomRequest,
        res: Response
    ) {
        const { body } = req;
        const { user } = req.headers;
        const parsedBody: IFormattedSymptom[] = body['symptoms'];
        try {
            const data = await diagnoseService.create(parsedBody, user!);
            res.status(201).json(data);
        } catch (error) {
            console.error(error);
            throw new InternalError();
        }
    };

    public async list(
        req: ICustomRequest,
        res: Response
    ) {
        const { user } = req.headers;
        const { symptoms } = req.query;

        try {
            const data = await diagnoseService.list(symptoms as string, user!.patient.gender, new Date(user!.patient.birthday!).getFullYear());
            res.status(200).json({ data });
        } catch (error) {
            console.error(error);
            throw new InternalError();
        }
    };
}

export { DiagnosisController };