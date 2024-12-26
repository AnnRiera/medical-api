import { Request, Response, NextFunction } from 'express';
import { IUserToken } from '../interfaces/main.interface';
import BaseMiddleware from './base.middleware';
import { Utils } from '../utility/utils';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/configs';

const utils = new Utils();

export interface CustomRequest extends Request {
  user?: IUserToken
  token?: string
}

interface DecodedToken {
  _id: string
}

// class AuthHandler extends BaseMiddleware {
  export function validateToken(req: Request, res: Response, next: NextFunction) {
  try {
      const authHeader = req.header('Authorization')
      const token = authHeader && authHeader.replace('Bearer ', '')

      if (!token) {
        res.status(401).json({ message: 'Invalid token' });
        //throw new Error('Authentication failed. Token missing.')
      }
  
      jwt.verify(token!, JWT_SECRET_KEY, (error, response) => {
        if (error) res.status(403).json({ message: 'Invalid token' });
        console.log(response);
        next();
      });

      
      // const user = await this.db.user.findUnique({ where:
      //   {
      //     id: decoded.
      //   }
      // })
  
      // if (!user) {
      //   throw new Error('Authentication failed. User not found.')
      // }
  
      // req.user = user
      // req.token = token
      // next()
    } catch (error) {
      res.status(401).send({ error: 'Authentication failed.' })
    }
  }
//}

//export { AuthHandler };