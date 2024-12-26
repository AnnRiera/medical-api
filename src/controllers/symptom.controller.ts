import { Request, Response } from 'express';
import { SymptopmService } from '../services/symptom.service';

const symptomService = new SymptopmService();

class SymptomController {
    public async create(
        req: Request,
        res: Response
    ) {
        try {
            const data = await symptomService.create();
            res.status(201).json({ data });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error });
        }
    };

    public async list(
        req: Request,
        res: Response
    ) {
        try {
            const data = await symptomService.list();
            res.status(200).json({ data });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error });
        }
    };
}

export { SymptomController };