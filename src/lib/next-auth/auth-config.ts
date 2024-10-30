import { type NextAuthConfig } from "next-auth"
import prisma from "@/lib/prisma"
import { getUserByEmail } from "@/actions/auth.actions"
import { Role } from "@prisma/client"
import { providers } from "./providers"
import { executeIfEnabled } from "@/flags"
import { CustomPrismaAdapter } from "./adapter"
export const authConfig: NextAuthConfig = {
    providers,
}