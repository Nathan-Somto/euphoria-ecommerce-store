import { z } from "zod"
const categorySchema = z.object({
    name: z.string().min(2, {
      message: "Name of category must be at least 2 characters.",
    }),
  })
type CategorySchema =  z.infer<typeof categorySchema>
export {
    categorySchema,
    type CategorySchema
}