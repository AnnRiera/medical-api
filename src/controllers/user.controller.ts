import { Request, Response } from 'express';
import { ICreateUser, ICredentials, IUser, ICredentialUser} from '../interfaces/main.interface';
import { UserService } from '../services/user.service';
import { InternalError } from '../errors/intersalServer.error';

const userService = new UserService();

class UserController {
    public async create(
        req: Request,
        res: Response
    ) {
        const { firstName, lastName, email, gender, birthday, password } = req.body;

        const user: IUser = {
            firstName,
            lastName,
            email,
            gender,
            birthday,
            password,
        }
        try {
            const data: ICreateUser = await userService.create(user);
            res.status(201).json({ message: data.message });
        } catch (error) {
            console.error(error);
            throw new InternalError();
        }
    };

    public async login(
        req: Request,
        res: Response
    ) {
        const { email, password } = req.body;

        const user: ICredentials = {
            email,
            password,
        }

        try {
            const data = await userService.login(user);

            if (!data) {
                res.status(400).json({ message: 'Invalid credentials' });
            }

            res.status(200).json({ token: data });
        } catch (error) {
            console.error(error);
            throw new Error();
        }
    };
}

export { UserController };