import { z } from "zod";

const loginSchema = z.object({
    email: z.string({
      required_error: "Email is required.",  
    }).email({
        message: "Invalid email address."
    }),
    password: z.string({
        required_error: "Password is required."
    }).min(8, "Password must be at least 8 characters.")
});
const signUpSchema = z.object({
    ...loginSchema.shape,
    terms: z.boolean().refine(value => value === true, {
        message: "You must agree to the terms and conditions."
    }),
    newsLetter: z.boolean()
})
const resetPasswordSchema = z.object({
    email: z.string({
        required_error: "Email is required.",  
      }).email({
          message: "Invalid email address."
      }),
})
const newPasswordSchema = z.object({
    password: z.string({
        required_error: "Password is required."
    }).min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string({
        required_error: "Confirmed Password is required."
    }).min(8, "Confirmed Password must be at least 8 characters.")
}) .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
const verifyEmailSchema = z.object({
    token: z.string().max(6)
})
type LoginSchema = z.infer<typeof loginSchema>
type SignUpSchema = z.infer<typeof signUpSchema>
type NewPasswordSchema = z.infer<typeof newPasswordSchema>
type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>

export {
    loginSchema,
    signUpSchema,
    newPasswordSchema,
    resetPasswordSchema,
    verifyEmailSchema
};
export type { LoginSchema, SignUpSchema, NewPasswordSchema, ResetPasswordSchema, VerifyEmailSchema };