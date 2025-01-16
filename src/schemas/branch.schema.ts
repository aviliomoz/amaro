import { z } from 'zod'

export const BranchSchema = z.object({
    id: z.string().uuid(),
    name: z.string().max(100),
    currency_code: z.string().max(3),
    purchase_tax: z.number().min(0).max(100),
    sales_tax: z.number().min(0).max(100),
    status: z.enum(["active", "inactive"]).default("active"),
    brand_id: z.string().uuid(),
});

export type Branch = z.infer<typeof BranchSchema>
export type NewBranch = Omit<Branch, "id">