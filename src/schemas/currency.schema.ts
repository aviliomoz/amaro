import { z } from "zod";

export const CurrencySchema = z.object({
    code: z.string().length(3),
    name: z.string().max(50),
    symbol: z.string().max(10),
});

export type Currency = z.infer<typeof CurrencySchema>;