'use server'
import { currentSession } from "@/lib/next-auth";
import { tryCatchFn } from "@/utils/tryCatchFn";
import prisma from "@/lib/prisma";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";
//1. update a user's profile
export const updateUserProfile = async (data: Partial<Pick<Session['user'], 'name' | 'email' | 'username'>>, userId: string) => {
    return await tryCatchFn({
        returnErrorMessage: true,
        message: "failed to update user profile",
        cb: async () => {
            const session = await currentSession();
            if (!session) {
                throw new Error("user not authenticated")
            }
            if (session.user.id !== userId) {
                throw new Error("user not authorized")
            }
            const user = await prisma?.user.update({
                where: {
                    id: userId
                },
                data: {
                    name: data.name,
                    email: data.email,
                    username: data.username
                }
            })
            revalidatePath('/dashboard')
            return user
        }
    })
}
//2. disable a user(admin)
//3. enable a user(admin)
//4. get all users(admin)