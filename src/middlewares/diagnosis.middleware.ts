import { IFormattedSymptom } from '../interfaces/main.interface';
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../utility/connections';

export async function diagnosisHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const symptoms = req.body.symptoms as IFormattedSymptom[];
        const symptomsId = symptoms.map((value) => value.id);

        const savedSymptoms = await prisma.instance.symptom.findMany({
            where: {
                id: { in: symptomsId },
            },
        });

        const savedIds = savedSymptoms.map((value) => value.id);

        const difference = symptomsId.filter((value) => !savedIds.includes(value));

        if (difference.length > 0) {
            res.status(404).send({ error: `Invalid symptom ids: ${difference}` });
        } else {
            next();
        }
    } catch (error) {
        res.status(403).send({ error: 'Creation of diagnosis failed.' })
    }
}
