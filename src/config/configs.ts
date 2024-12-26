import { Prisma } from '@prisma/client';

export const configs: Prisma.Datasource = {
    url: process.env.DATABASE_URL ?? ''
}

export const APP_PORT = process.env.PORT || 3000;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? '';
export const API_MEDIC_API_KEY = process.env.API_MEDIC_API_KEY ?? '';
export const API_MEDIC_SECRET_KEY = process.env.API_MEDIC_SECRET_KEY ?? '';
export const API_MEDIC_URI = process.env.API_MEDIC_URI ?? '';
export const API_MEDIC_DIAGNOSIS_URL = process.env.API_MEDIC_DIAGNOSIS_URL ?? '';
export const API_MEDIC_SYMPTOMS_URL = process.env.API_MEDIC_SYMPTOMS_URL ?? '';