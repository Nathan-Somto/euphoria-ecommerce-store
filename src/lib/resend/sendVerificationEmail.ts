import { tryCatchFn } from "@/utils/tryCatchFn"
import VerificationEmail from "../emails/verification-email"
import { resend } from "./resend"

export const sendVerificationEmail = async (email: string, name: string, token: string, verifyLink: string) => {
  return tryCatchFn({
    cb: async () => await resend.emails.send({
      from: process.env.EMAIL_FROM ?? '',
      to: email,
      subject: 'Password Reset Request',
      react: VerificationEmail({ name, token, verifyLink }),
    }),
    message: "Error sending verification email"
  })

}