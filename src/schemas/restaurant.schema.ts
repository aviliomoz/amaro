import { z } from 'zod'

export const RestaurantSchema = z.object({
    id: z.string().uuid(),
    name: z.string().max(100),
    currency_code: z.string().max(3),
    purchase_tax: z.number().min(0).max(100),
    sales_tax: z.number().min(0).max(100),
    status: z.enum(["active", "inactive"]).default("active")
});

export type Restaurant = z.infer<typeof RestaurantSchema>
export type NewRestaurant = Omit<Restaurant, "id">