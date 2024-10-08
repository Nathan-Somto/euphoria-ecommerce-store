import * as z from "zod";
const productSchema = z.object({
    name: z.string(),
    price: z.coerce.number(),
    description: z.string().min(10),
    discountRate: z.coerce.number().optional(),
    colors: z.array(z.string().startsWith('#').min(3)),
    categoryId: z.string(),
    images: z.array(z.string()),
    isFeatured: z.boolean(),
    isArchived: z.boolean(),
    sizes: z.array(z.object({
        label: z.string(),
        value: z.enum(["XS", "SM", "MD", "LG", "XL", "XXL"])
    }))
});
type ProductSchema = z.infer<typeof productSchema>

export {
    productSchema
};
export type { ProductSchema };

