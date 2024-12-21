import { BaseError } from './base.error';

export class BadRequestError extends BaseError {
  statusCode = 400;
  data?: any[];
  constructor (public message: string, data?: any[]) {
    super(message)
    this.data = data;
    // only because we are extending a built in class
    Object.setPrototypeOf(this, BadRequestError.prototype)
  }

  serializeErrors () {
    return [
      {
        message: this.message,
        data: this.data
      }
    ]
  }
}
