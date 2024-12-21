import { BadRequestError } from '../errors/badRequest.error';
import { PrismaClient } from '@prisma/client';
import { configs } from '../config/configs';

const { url } = configs

if (!url) {
    throw new BadRequestError('String connection is required');
}

const prisma = {
    instance: new PrismaClient({
        datasources: {
            db: { url },
        }
    }),
};
  
export type db = typeof prisma;
Object.freeze(prisma);

export { prisma };