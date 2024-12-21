import { Request, Response } from 'express';
import { IUser } from '../interfaces/main.interface';
import { UserService } from '../services/user.service';
import { InternalError } from '../errors/intersalServer.error';

const userService = new UserService();

class UserController {
    public async create(
        req: Request,
        res: Response
    ) {
        const { firstName, lastName, email, gender, birthday, username, password } = req.body;

        const user: IUser = {
            firstName,
            lastName,
            email,
            gender,
            birthday,
            username,
            password,
        }
        try {
            const data = await userService.create(user);

            if (!data.created) {
                res.status(400).json({ message: data.message });
            }

            res.status(201).json({ message: data.message });
        } catch (error) {
            console.error(error);
            throw new InternalError();
        }
    };
}

export { UserController };