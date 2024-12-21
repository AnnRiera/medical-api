import { BadRequestError, InternalError } from '../errors/main.error';
import { IUser, ICreateUser } from '../interfaces/main.interface';
import { Utils } from '../utility/utils';
import BaseService from './base.service';

const utils = new Utils();

class UserService extends BaseService {
    public async create(user: IUser): Promise<ICreateUser> {
        let response: ICreateUser = {
            created: false
        };
        try {
            const userExists = await this.db.user.findUnique({ where: { email: user.email } });
            if (userExists) {
                response.message = 'Please try another email address';
                return response;
            }

            const hashedPassword = utils.encrypt(user.password);

            await this.db.user.create({
                data: {
                    first_name: user.firstName,
                    last_name: user.lastName,
                    email: user.email,
                    gender: user.gender,
                    birthday: new Date(user.birthday),
                    username: user.username,
                    password: hashedPassword,
                },
            });

            response.created = true;
            return response;
        } catch (error) {
            console.error(error);
            if (error instanceof BadRequestError) throw new BadRequestError(error.message, error.data);
            throw new InternalError();
        }
    }
}

export { UserService };