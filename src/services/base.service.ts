import { prisma } from '../utility/connections';
abstract class BaseService {
  protected db = prisma.instance;
  
  constructor () {}
}

export default BaseService;