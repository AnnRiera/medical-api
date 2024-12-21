import { Prisma } from '@prisma/client';

export const configs: Prisma.Datasource = {
    url: process.env.DATABASE_URL ?? ''
}

export const CRYPTO_KEYLEN = process.env.CRYPTO_KEYLEN ?? 64;
export const CRYPTO_RANDOM_BYTES = process.env.CRYPTO_KEYLEN ?? 32;