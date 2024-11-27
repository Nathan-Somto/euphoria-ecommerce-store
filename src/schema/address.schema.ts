import * as z from 'zod'
const addressSchema = z.object({
    street: z.string().min(3),
    city: z.string(),
    state: z.string().min(2),
    zip: z.string(),
    country: z.string(),
    phoneNumber: z.string(),
    isDefault: z.boolean().optional()
})
type AddressSchema = z.infer<typeof addressSchema>
export {
    addressSchema,
    type AddressSchema
}