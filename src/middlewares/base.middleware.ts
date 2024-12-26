import { prisma } from '../utility/connections';
abstract class BaseMiddleware {
  protected db = prisma.instance;
  
  constructor () {}
}

export default BaseMiddleware;