import { ICustomRequest, IUser, IUserToken } from '../interfaces/main.interface';
import { JWT_SECRET_KEY } from '../config/configs';
import { Response, NextFunction } from 'express';
import { prisma } from '../utility/connections';
import jwt from 'jsonwebtoken';


export function validateToken(req: ICustomRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.replace('Bearer ', '')

    if (!token) {
      res.status(403).json({ message: 'Invalid token' });
    }

    jwt.verify(token!, JWT_SECRET_KEY, async (error, response) => {
      if (error) res.status(401).json({ message: 'Invalid token' });
      const result = response as IUserToken;
      const user = await prisma.instance.user.findUnique({ where:
        {
          id: result.id,
        },
        select: {
          id: true,
          patient: true
        }
      });
  
      if (!user) {
        res.status(404).send({ errors: 'User not found.' });
      } else {
        const patient: IUserToken = {
          id: user.id,
          patient: {
            firstName: user.patient!.firstName,
            lastName: user.patient!.lastName,
            gender: user.patient!.gender,
            birthday: user.patient!.birthday,
          }
        }
    
        req.headers.user = patient;
        next();
      }
    });
  } catch (error) {
    res.status(401).send({ error: 'Authentication failed.' })
  }
}