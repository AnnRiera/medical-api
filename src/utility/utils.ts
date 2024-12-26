import { InternalError } from '../errors/intersalServer.error';import bcrypt from 'bcryptjs';
import { BadRequestError } from '../errors/badRequest.error';
import { IUserToken } from '../interfaces/main.interface';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import {
    API_MEDIC_SECRET_KEY,
    API_MEDIC_URI,
    API_MEDIC_API_KEY
} from '../config//configs';
import axios from 'axios';

class Utils {
    public encrypt(password: string): string {
        const salt = bcrypt.genSaltSync(16);
        return bcrypt.hashSync(password, salt);
    };

    public compare(password: string, savedPassword: string): boolean {
        return bcrypt.compareSync(password, savedPassword);
    };

    public generateToken(user: IUserToken, secret: string): string {
        return jwt.sign(user, secret, { expiresIn: '1d'});
    }

    public decodeToken(token: string): string | jwt.JwtPayload | null {
        return jwt.decode(token);
    }

    public generateHash(): string {
        const computedHash = crypto.createHmac('md5', API_MEDIC_SECRET_KEY);
        computedHash.update(API_MEDIC_URI);
        return computedHash.digest('base64');
    }

    public async apiMedicAuth() {
        const computedHashString = this.generateHash();
        try {
            const { data, status, statusText } = await axios.request({
                url: API_MEDIC_URI,
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_MEDIC_API_KEY}:${computedHashString}`
                }
            });
    
            if (status !== 200) {
                throw new BadRequestError('Failed to authenticate in ApiMedic', [{ response: statusText }]);
            }
            return data;
        }
        catch (error) {
            console.error(error);
            throw new InternalError();
        }
    }

    public async request(method: string, url: string): Promise<{
        data: any;
        status: number;
        statusText: string;
    }> {
        try {
            const { data, status, statusText } = await axios.request({
                url: url,
                method: method
            });
    
            if (status !== 200) {
                throw new BadRequestError('Request to ApiMedic failed', [{ response: statusText }]);
            }
            return {
                data,
                status,
                statusText
            };
        }
        catch (error) {
            console.error(error);
            throw new InternalError();
        }
    }
}

export { Utils };