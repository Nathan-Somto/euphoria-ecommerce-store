import { Provider } from "next-auth/providers";
import Github, { GitHubProfile } from "next-auth/providers/github"
import { OAuthConfig } from "next-auth/providers"
import Google, { GoogleProfile } from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bycrypt from "bcryptjs"
import { getUserByEmail } from "@/actions/auth.actions"
const oAuthProviders = [
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET &&
    (
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ),
    process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET && (
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        })
    )].filter(Boolean) as (OAuthConfig<GoogleProfile> | OAuthConfig<GitHubProfile>)[]
export const providers: Provider[] = [
    ...oAuthProviders,
    Credentials({
        credentials: {
            password: { label: "Password", type: "password" },
            email: { label: "Email", type: "email" },
        },
        authorize: async (credentials, request) => {
            const { email, password } = credentials
            if (typeof email !== "string" || typeof password !== 'string') return null
            const user = await getUserByEmail(email)
            if (!user || !user?.data?.password) return null
            const passwordMatch = await bycrypt.compare(password, user.data.password)
            // check if the request is coming from the admin site auth page
            if (request.url.includes("/admin/auth") && user?.data?.role !== "ADMIN") return null
            if (!passwordMatch) return null
            return {
                id: user.data.id,
                email: user.data.email,
                role: user.data.role,
                username: user.data.username,
                profilePhoto: user.data.profilePhoto,
                isEmailVerified: user.data.isEmailVerified
            }
        },
    })]