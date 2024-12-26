import { z } from 'zod';  

export const userRegistrationSchema = z.object({
    email: z.string().email(),
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    gender: z.enum(['male', 'female']),
    birthday: z.string(),
    password: z.string().min(8),
});

export const userLoginSchema = z.object({
    email: z.string(),
    password: z.string().min(8),
});