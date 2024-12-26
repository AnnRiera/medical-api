import { Request, Response } from 'express';
import { DiagnosisService } from '../services/diagnosis.service';
import { InternalError } from '../errors/intersalServer.error';
import { Utils } from '../utility/utils';
import { IUserToken, IFormattedSymptom } from '../interfaces/main.interface';

const diagnoseService = new DiagnosisService();
const utils = new Utils();

class DiagnosisController {
    public async create(
        req: Request,
        res: Response
    ) {
        const { body } = req;
        const { headers } = req;
        const session = utils.getSession(headers.authorization!);
        const user = session as IUserToken;
        const parsedBody: IFormattedSymptom[] = body['symptoms'];
        try {
            const data = await diagnoseService.create(parsedBody, user);
            res.status(201).json(data);
        } catch (error) {
            console.error(error);
            throw new InternalError();
        }
    };

    public async list(
        req: Request,
        res: Response
    ) {
        const { headers } = req;
        const { symptoms } = req.query;
        const session = utils.getSession(headers.authorization!);
        const user = session as IUserToken;

        try {
            const data = await diagnoseService.list(symptoms as string, user.gender!, new Date(user.birthday!).getFullYear());
            res.status(200).json({ data });
        } catch (error) {
            console.error(error);
            throw new InternalError();
        }
    };
}

export { DiagnosisController };