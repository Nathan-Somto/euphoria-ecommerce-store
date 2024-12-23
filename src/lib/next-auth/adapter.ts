import { PrismaAdapter } from "@auth/prisma-adapter";
import { AdapterUser, Adapter } from "next-auth/adapters";

import { PrismaClient } from "@prisma/client";
import { generateUsername } from "@/utils/generateUsername";
export function CustomPrismaAdapter(
    prisma: PrismaClient | ReturnType<PrismaClient["$extends"]>
): Adapter {
    const p = prisma as PrismaClient
    // edit the createUser method returned from the adapter
    return {
        ...PrismaAdapter(prisma),
        createUser: async (profile) => {
            console.log("in create user adapter")
            console.log(profile)
            const user = await p.user.create({
                data: {
                    email: profile.email,
                    username: generateUsername(profile.name ?? 'abcdedfghijkl'),
                    role: 'CUSTOMER',
                    profilePhoto: profile?.image ?? null,
                    isEmailVerified: false,
                    name: profile.name ?? ''
                }
            });
            return {
                email: user.email,
                name: user.name,
                id: user.id,
                emailVerified: null,
                username: user.username,
                image: user.profilePhoto,
                isEmailVerified: user.isEmailVerified,
                role: user.role,
                isDisabled: user.isDisabled
            };
        }
    }
}