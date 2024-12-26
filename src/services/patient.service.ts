import { BadRequestError, InternalError } from '../errors/main.error';
import BaseService from './base.service';


class PatientService extends BaseService {
    public async getHistory(userId: number) {
        try {
            const patient = await this.db.patient.findFirst({
                where: { userId },
            });

            if (!patient) {
                throw new BadRequestError('No patient found');
            }

            const history = await this.db.diagnosisByPatient.findMany({
                where: { patientId: patient.id },
                include: {
                    diagnosis: {
                        include: {
                            symptoms: true
                        },
                    },
                    patient: {
                        select: {
                            firstName: true,
                            lastName: true,
                            birthday: true,
                            gender: true
                        }
                    }
                }
            });
            return history;
        } catch (error) {
            console.error(error);
            if (error instanceof BadRequestError) throw new BadRequestError(error.message, error.data);
            throw new InternalError();
        }
    }
}

export { PatientService };