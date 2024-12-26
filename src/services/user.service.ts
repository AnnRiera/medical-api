import { BadRequestError, InternalError } from '../errors/main.error';
import { IUser, ICreateUser } from '../interfaces/main.interface';
import { ICredentials } from '../interfaces/main.interface';
import { JWT_SECRET_KEY } from '../config//configs';
import { Utils } from '../utility/utils';
import BaseService from './base.service';

const utils = new Utils();

class UserService extends BaseService {
    public async create(data: IUser): Promise<ICreateUser> {
        let response: ICreateUser = {
            created: false
        };
        const hashedPassword = utils.encrypt(data.password);
        try {
            const userExists = await this.db.user.findUnique({ where: { email: data.email } });
            if (userExists) {
                response.message = 'Please try another email address';
                return response;
            }

            const user = await this.db.user.create({
                data: {
                    email: data.email,
                    password: hashedPassword,
                    createdAt: new Date()
                },
            });
            
            await this.db.patient.create({
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    gender: data.gender,
                    birthday: new Date(data.birthday),
                    createdAt: new Date(),
                    userId: user.id
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

    public async login(credentials: ICredentials): Promise<string | undefined> {
        const { email, password } = credentials;
        try {
            const user = await this.db.user.findUnique({
                where: { email },
                select: {
                    id: true,
                    email: true,
                    password: true
                }
            });

            if (!user) {
                return;
            }
        
            const isPasswordValid = utils.compare(password, user.password);
        
            if (!isPasswordValid) {
                return;
            }

            const patient = await this.db.patient.findUnique({
                where: { userId: user.id }
            });
        
            const token = utils.generateToken(
                {
                    patient:{
                        firstName: patient!.firstName,
                        lastName: patient!.lastName,
                        birthday: patient!.birthday,
                        gender: patient!.gender,
                    },
                    id: user.id,
                },
                JWT_SECRET_KEY
            )
            await this.addTokenToUser(user.id, token);
            return token;
        } catch (error) {
            console.error(error);
            throw new BadRequestError('Bad credentials');
        }
    };

    public async addTokenToUser(userId: number, token: string): Promise<void> {
        try {
            await this.db.user.update({
                where: { id: userId },
                data: {
                    token,
                    lastLogin: new Date()
                }
            });
        } catch (error) {
            console.error(error);
            if (error instanceof BadRequestError) throw new BadRequestError(error.message, error.data);
            throw new InternalError();
        }
    }

    public refreshToken(userId: number, token: string) {
        try {
            
        } catch (error) {
            console.error(error);
            if (error instanceof BadRequestError) throw new BadRequestError(error.message, error.data);
            throw new InternalError();
        }
    }
}

export { UserService };