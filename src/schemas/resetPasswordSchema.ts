import { z } from 'zod';

export const resetPasswordSchema = z.object({
    password: z.string().min(8, "Password must be atleast 8 charcters long")
})