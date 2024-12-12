import { z } from "zod";

const intentSchema = z.object({
    userId: z.string(), // route is protected by default
    currency: z.enum(['usd', 'ngn']),
    items: z.array(z.object({
        productId: z.string(),
        price: z.number().min(1),
        discountRate: z.number().nullable(),
        quantity: z.number().min(1)
    }))
})
type IntentSchema = z.infer<typeof intentSchema>
export {
    intentSchema,
    type IntentSchema
}