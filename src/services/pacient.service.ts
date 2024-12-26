import { BadRequestError, InternalError } from '../errors/main.error';
import { Utils } from '../utility/utils';
import BaseService from './base.service';

const utils = new Utils();

class PacientService extends BaseService {
    public async getHistory(userId: number) {
        try {
            const pacient = await this.db.pacient.findFirst({
                where: { userId },
            });

            if (!pacient) {
                throw new BadRequestError('No pacient found');
            }

            const history = await this.db.diagnosisByPacient.findMany({
                where: { pacientId: pacient.id },
                include: {
                    diagnosis: {
                        include: {
                            symptoms: true
                        },
                    },
                    pacient: {
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

export { PacientService };