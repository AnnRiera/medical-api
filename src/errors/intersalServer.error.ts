import { BaseError } from './base.error';

export class InternalError extends BaseError {
  statusCode = 500;
  reason = 'Something went wrong';
  constructor () {
    super('Something went wrong')
    // only because we are extending a built in class
    Object.setPrototypeOf(this, InternalError.prototype)
  }

  serializeErrors () {
    return [
      { message: this.reason }
    ]
  }
}
