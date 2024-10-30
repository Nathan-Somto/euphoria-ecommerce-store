import { tryCatchFn } from "@/utils/tryCatchFn";
import ResetPasswordEmail from "../emails/password-reset-email";
import { resend } from "./resend";

export const sendResetEmail = async (email: string, name: string, resetLink: string) => {
  return tryCatchFn({
    cb: async () => await resend.emails.send({
      from: process.env.EMAIL_FROM ?? '',
      to: email,
      subject: 'Password Reset Request',
      react: ResetPasswordEmail({ name, resetLink }),
    }),
    message: "Error sending reset email"
  })

}