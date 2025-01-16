import { z } from 'zod'

export const BrandSchema = z.object({
    id: z.string().uuid(),
    name: z.string().max(100),
    status: z.enum(["active", "inactive"]).default("active"),
})

export type Brand = z.infer<typeof BrandSchema>
export type NewBrand = Omit<Brand, "id">