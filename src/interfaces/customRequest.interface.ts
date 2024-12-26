import { IncomingHttpHeaders } from 'http';
import { Request } from 'express';
import { IUserToken } from './main.interface';

interface ICustomRequest extends Request {
  headers: IncomingHttpHeaders & {
    token?: string;
    user?: IUserToken;
  }
}

export { ICustomRequest }