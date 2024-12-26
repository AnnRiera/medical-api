import { IDiagnosisResponseStructure, IUserToken, IDiagnosisResponse, IFormattedSymptom } from '../interfaces/main.interface';
import { BadRequestError, InternalError } from '../errors/main.error';
import { API_MEDIC_DIAGNOSIS_URL } from '../config/configs';
import { Utils } from '../utility/utils';
import BaseService from './base.service';
import { LANGUAGE } from '../constants';
import { Prisma } from '@prisma/client';

const utils = new Utils();

class DiagnosisService extends BaseService {
    public async create(symptoms: IFormattedSymptom[], patientInfo: IUserToken) {
        const yearOfBirth = new Date(patientInfo.patient.birthday!).getFullYear();
        try {
            const listOfSymtoms = symptoms.map((value) => value.symptomId).join(',');
            const diagnosis: IDiagnosisResponseStructure[] = await this.list(listOfSymtoms, patientInfo.patient.gender, yearOfBirth);
            const createdDiagnosis: IDiagnosisResponse[] = [];

            for (let dgn of diagnosis) {
                const specialisation = dgn.Specialisation.map((value) => {
                    return {
                        id: value.ID,
                        name: value.Name,
                        specialistId: value.SpecialistId
                    };
                }) as Prisma.JsonArray;
                
                const savedDiagnosis = await this.db.diagnosis.create({
                    data: {
                        accuracy: dgn.Issue.Accuracy,
                        diagnosisId: dgn.Issue.ID,
                        icd: dgn.Issue.Icd,
                        icdName: dgn.Issue.IcdName,
                        name: dgn.Issue.Name,
                        profName: dgn.Issue.ProfName,
                        specialisations: specialisation,
                    }
                });

                await this.db.symptomByDiagnosis.create({
                    data: {
                        diagnosisId: savedDiagnosis.id,
                        symptomId: savedDiagnosis.id,
                    }
                });

                await this.db.diagnosisByPatient.create({
                    data: {
                        diagnoseId: savedDiagnosis.id,
                        patientId: patientInfo.id
                    }
                });
            }

            return createdDiagnosis;
        } catch (error) {
            console.error(error);
            if (error instanceof BadRequestError) throw new BadRequestError(error.message, error.data);
            throw new InternalError();
        }
    }

    public async list(symptoms: string, gender: string, yearOfBirth: number): Promise<IDiagnosisResponseStructure[]> {
        try {
            const token = await utils.apiMedicAuth();
            const { status, statusText, data } = await utils.request(
                'GET',
                `${API_MEDIC_DIAGNOSIS_URL}?token=${token["Token"]}&${LANGUAGE}&symptoms=[${symptoms}]&gender=${gender}&year_of_birth=${yearOfBirth}`
            );

            if (status !== 200) {
                throw new BadRequestError('Failed to fetch diagnosis from ApiMedic', [{ response: statusText }]);
            }

            const response: IDiagnosisResponseStructure[] = data;
            return response;
        } catch (error) {
            console.error(error);
            if (error instanceof BadRequestError) throw new BadRequestError(error.message, error.data);
            throw new InternalError();
        }
    }
}

export { DiagnosisService };