import { BadRequestError, InternalError } from '../errors/main.error';
import { IDataResponse, ISymptom } from '../interfaces/main.interface';
import { API_MEDIC_SYMPTOMS_URL } from '../config/configs';
import { LANGUAGE } from '../constants';
import { Utils } from '../utility/utils';
import BaseService from './base.service';

const utils = new Utils();

class SymptopmService extends BaseService {
    public async create(): Promise<{
        id: number;
        symptomId: number;
        name: string;
    }[]> {
        try {
            const token = await utils.apiMedicAuth();
            const { status, statusText, data } = await utils.request(
                'GET',
                `${API_MEDIC_SYMPTOMS_URL}?token=${token["Token"]}&${LANGUAGE}`
            );

            if (status !== 200) {
                throw new BadRequestError('Failed to fetch symptoms from ApiMedic', [{ response: statusText }]);
            }

            const response: IDataResponse[] = data;
            const symptoms: ISymptom[] = [];
            const listOfSymptoms = [];
            for (let symptom of response.values()) {
                symptoms.push({
                    symptomId: symptom.ID,
                    name: symptom.Name
                });
            }
            
            for (let symptom of symptoms.sort((a, b) => a.symptomId - b.symptomId)) {
                listOfSymptoms.push(await this.db.symptom.upsert({
                    where: {
                        symptomId: symptom.symptomId
                    },
                    create: symptom,
                    update: {
                        name: symptom.name,
                    },
                    select: {
                        id: true,
                        symptomId: true,
                        name: true
                    }
                }));
            }
            return listOfSymptoms;
        } catch (error) {
            console.error(error);
            if (error instanceof BadRequestError) throw new BadRequestError(error.message, error.data);
            throw new InternalError();
        }
    }

    public async list() {
        try {
            return await this.db.symptom.findMany({
                orderBy: {
                    id: 'asc'
                },
                select: {
                    id: true,
                    symptomId: true,
                    name: true
                }
            });
        } catch (error) {
            console.error(error);
            if (error instanceof BadRequestError) throw new BadRequestError(error.message, error.data);
            throw new InternalError();
        }
    }
}

export { SymptopmService };