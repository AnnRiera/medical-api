import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../errors/base.error';

export const errorHandler = (error: Error, req: Request, res:Response, next: NextFunction) => {
  console.error(error);
  if (error instanceof BaseError) {
    res.status(error.statusCode).send({ errors: error.serializeErrors() });
  }

  res.status(500).send({ errors: [{ message: 'Something went wrong' }] });
}
