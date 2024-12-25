'use server'
import { v4 as uuidv4 } from 'uuid'
import { tryCatchFn } from "@/utils/tryCatchFn"
import prisma from "@/lib/prisma"
import bycrypt from "bcryptjs"
import { signIn } from '@/lib/next-auth'
import { SignUpSchema } from '@/schema/auth.schema'
import { generateUsername } from '@/utils/generateUsername'
import { sendResetEmail, sendVerificationEmail } from '@/lib/resend'
import { executeIfEnabled } from '@/flags'
export async function getUserByEmail(email: string) {
    return await tryCatchFn({
        cb: async () => await prisma.user.findUnique({
            where: {
                email
            }
        })
        ,
        message: "Error fetching user by email"
    })
}
export async function getUserById(id: string) {
    return await tryCatchFn({
        cb: async () => await prisma.user.findUnique({
            where: {
                id
            }
        })
        ,
        message: "Error fetching user by id"
    })
}
export async function getUserAccountById(userId: string) {
    return await tryCatchFn({
        cb: async () => await prisma.account.findFirst({
            where: {
                userId
            }
        })
        ,
        message: "Error fetching user account by user id"
    })
}
export async function generateToken(userId: string, type: 'verification' | 'passwordReset') {
    return await tryCatchFn({
        cb: async () => {
            const token = uuidv4()
            const expiryTime = new Date(Date.now() * 1000 * 60 * 60) //1 hour
            if (type === 'verification') {
                const res = await prisma.verificationToken.upsert({
                    where: {
                        userId
                    },
                    update: {
                        token,
                        expiresAt: expiryTime
                    },
                    create: {
                        userId,
                        token,
                        expiresAt: expiryTime
                    }
                });
                return {
                    ...res,
                    type
                }
            }
            else {
                const res = await prisma.passwordResetToken.upsert({
                    where: {
                        userId
                    },
                    update: {
                        token,
                        expiresAt: expiryTime
                    },
                    create: {
                        userId,
                        token,
                        expiresAt: expiryTime
                    }
                })
                return {
                    ...res,
                    type
                }
            }
        }
        ,
        message: "Error generating verification token"
    })
}
export async function verifyEmail(email: string, token: string, callbackUrl: string) {
    return await tryCatchFn({
        cb: async () => {
            const user = await getUserByEmail(email)
            if (user?.data === null || user?.data === undefined) throw new Error('user not found');
            const userId = user.data.id
            const verificationToken = await prisma.verificationToken.findFirst({
                where: {
                    userId,
                    token
                }
            })
            if (!verificationToken) throw new Error("Invalid verification token")
            if (verificationToken.expiresAt < new Date()) throw new Error("Verification token expired")
            await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    isEmailVerified: true
                }
            })
            await prisma.verificationToken.delete({
                where: {
                    userId
                }
            })
            await signIn('credentials', {
                email: user.data.email,
                password: user.data.password,
                redirectTo: callbackUrl
            })
            return {
                isEmailVerified: true
            }
        },
        message: "Error fetching verification token"
    })
}
export async function loginUser(
    credentials: {
        email: string,
        password: string
    },
    callbackUrl: string,
    forAdmin: boolean,
) {
    return await tryCatchFn({
        cb: async () => {
            const user = await getUserByEmail(credentials.email)
            if (!user.data || !user.data.password) throw new Error("Invalid email or password")
            const passwordMatch = await bycrypt.compare(credentials.password, user.data.password)
            if (forAdmin && user.data.role !== 'ADMIN') throw new Error("You are not authorized to access this page")
            if (!passwordMatch) throw new Error("Invalid email or password")
            const res = await executeIfEnabled('EMAIL_VERIFICATION', async () => {
                if (user.data) {
                    if (!user.data.isEmailVerified) {
                        const { data } = await generateToken(user.data.id, 'verification');
                        if (!data?.token) throw new Error('Error generating verification token')
                        const verifyLink = `${process.env.SITE_URL}/auth/verify-email?email=${user.data.email}`;
                        const { data: verifyEmailRes } = await sendVerificationEmail(user.data.email, user.data.name, data.token, verifyLink);
                        if (!verifyEmailRes) throw new Error('Something went wrong sending verification email')
                        return {
                            message: "Verification email sent"
                        }
                    }
                }
                else {
                    throw new Error("Invalid email or password")
                }
            })
            if (res) return res
            await signIn('credentials', {
                email: credentials.email,
                password: credentials.password,
                redirectTo: callbackUrl
            })
            return {
                id: user.data.id,
                email: user.data.email,
                role: user.data.role,
                username: user.data.username,
                profilePhoto: user.data.profilePhoto,
                isEmailVerified: user.data.isEmailVerified,
                isOAuth: false
            }
        },
        message: "Error logging in user",
        returnErrorMessage: true,
        throwRedirectError: true
    })
}
export async function registerUser(values: SignUpSchema, redirectTo = '/') {
    return await tryCatchFn({
        cb: async () => {
            const user = await getUserByEmail(values.email)
            if (user.data) throw new Error("User already exists")
            const hashedPassword = await bycrypt.hash(values.password, 10)
            const res = await prisma.user.create({
                data: {
                    email: values.email,
                    password: hashedPassword,
                    username: generateUsername(values.name),
                    name: values.name,
                    role: 'CUSTOMER'
                }
            })
            const executeRes = await executeIfEnabled('EMAIL_VERIFICATION', async () => {
                const { data } = await generateToken(res.id, 'verification');
                if (!data?.token) throw new Error('Error generating verification token');
                const verifyLink = `${process.env.SITE_URL}/auth/verify-email?email=${res.email}`;
                const { data: verifyEmailRes } = await sendVerificationEmail(res.email, res.name, data.token, verifyLink);
                if (!verifyEmailRes) throw new Error('Something went wrong sending verification email')
                return true // that is the feature is working
            })
            if (!executeRes) {
                // login user if email verification is disabled
                await signIn('credentials', {
                    email: res.email,
                    password: values.password,
                    redirectTo
                })
            }
            return {
                id: res.id,
                email: res.email,
                role: res.role,
                username: res.username,
                profilePhoto: res.profilePhoto,
                isEmailVerified: res.isEmailVerified,
                isOAuth: false
            }
        },
        message: "Error registering user",
        returnErrorMessage: true,
        throwRedirectError: true
    })
}
export async function resetPassword(email: string) {
    return await tryCatchFn({
        cb: async () => {
            const user = await getUserByEmail(email)
            if (!user.data) throw new Error("User not found")
            const { data } = await generateToken(user.data.id, 'passwordReset');
            if (!data?.token) throw new Error('Error generating password reset token')
            const resetLink = `${process.env.SITE_URL}/auth/new-password/${data?.token}/?email=${user.data.email}`;
            const { data: resetEmailRes } = await sendResetEmail(user.data.email, user.data.name, resetLink);
            if (!resetEmailRes) throw new Error('Something went wrong sending password reset email')
            return {
                message: "Password reset email sent"
            }
        },
        message: "Error resetting password",
        returnErrorMessage: true
    })
};
export async function updatePassword(email: string, token: string, password: string) {
    return await tryCatchFn({
        cb: async () => {
            const user = await getUserByEmail(email)
            if (!user.data?.password) throw new Error("User not found")
            const userId = user.data.id
            const passwordMatch = await bycrypt.compare(password, user.data?.password);
            if (passwordMatch) throw Error("New Password is the same as old")
            const passwordResetToken = await prisma.passwordResetToken.findFirst({
                where: {
                    userId,
                    token
                }
            })
            if (!passwordResetToken) throw new Error("Invalid password reset token")
            if (passwordResetToken.expiresAt < new Date()) throw new Error("Password reset token expired")
            const hashedPassword = await bycrypt.hash(password, 10)
            await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    password: hashedPassword
                }
            })
            await prisma.passwordResetToken.delete({
                where: {
                    userId
                }
            })
            return {
                message: "Password updated successfully"
            }
        },
        message: "Error updating password",
        returnErrorMessage: true
    })
}
