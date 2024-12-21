import { CRYPTO_KEYLEN,  } from '../config//configs';
import crypto from 'crypto';

class Utils {
    public encrypt(password: string) {
        const salt = crypto.randomBytes(16).toString('hex');
        return crypto.scryptSync(password, salt, 64).toString('hex');
    };
}

export { Utils };