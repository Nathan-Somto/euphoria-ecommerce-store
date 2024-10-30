import NextAuth from "next-auth"
import { authConfig } from "./auth-config"
import { CustomPrismaAdapter } from "./adapter"
import prisma from "@/lib/prisma"
import { executeIfEnabled } from "@/flags"
import { getUserByEmail } from "@/actions/auth.actions"
import { Role } from "@prisma/client"
export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    adapter: CustomPrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/auth/login',
        signOut: '/',
    },
    callbacks: {
        signIn: async ({ user, account }) => {
            if (!user.id) return false
            if (account?.provider !== 'credentials') return true
            // check if the email is verified
            const res = await executeIfEnabled('EMAIL_VERIFICATION', async () => {
                if(!user.id) return false
                const existingUser = await getUserByEmail(user.id)
                if (!existingUser.data?.isEmailVerified) return false
            })
            // if the email is not verified, return false (when the feature is enabled)
            if (res !== undefined && !res) return false
            return true
        },
        jwt: async ({ user, account, token }) => {
            console.log("the token: ", JSON.stringify(user, null,2))
            console.log("the user: ", JSON.stringify(user, null,2))
            const existingUser = await getUserByEmail(token.email ?? user.email ?? '');
            if (!existingUser?.data) {
                token.id = user.id
                return token
            }
            token.id = existingUser.data.id
            token.email = existingUser.data.email
            token.role = existingUser.data.role
            token.username = existingUser.data.username
            token.profilePhoto = existingUser.data.profilePhoto
            token.isOAuth = account?.provider !== 'credentials'
            token.isEmailVerified = existingUser.data.isEmailVerified
            return token
        },
        session: ({ session, token }) => {
            if (session.user) {
                session.user.id = token.id as string
                session.user.email = token.email as string
                session.user.role = (token?.role ?? 'CUSTOMER') as Role
                session.user.username = token.username as string
                session.user.profilePhoto = token.profilePhoto as string
                session.user.isOAuth = token.isOAuth as boolean
            }
            return session
        }
    },
    events: {
        linkAccount: async ({ user }) => {
            // automatically verify the email if the user is linking an account
            await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    isEmailVerified: true
                }
            })
        },
    }

})