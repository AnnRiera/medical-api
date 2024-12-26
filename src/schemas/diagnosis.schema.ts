import { z } from 'zod';  

export const diagnosisSchema = z.object({
    symptoms: z.array(
        z.object({
            id: z.number(),
            symptomId: z.number(),
            name: z.string()
        })
    )
});