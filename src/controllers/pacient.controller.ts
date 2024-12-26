import { Request, Response } from 'express';
import { PacientService } from '../services/pacient.service';
import { InternalError } from '../errors/intersalServer.error';
import { Utils } from '../utility/utils';
import { IUserToken } from '../interfaces/main.interface';

const pacientService = new PacientService();
const utils = new Utils();

class PacientController {
    public async getHistory(
        req: Request,
        res: Response
    ) {
        const { headers } = req;
        const session = utils.getSession(headers.authorization!);
        const user = session as IUserToken;
        try {
            const data = await pacientService.getHistory(user.id);
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
            throw new InternalError();
        }
    };
}

export { PacientController };