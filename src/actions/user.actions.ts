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
//2. toggle user status(admin)
export const toggleUserStatus = async (userId: string) => {
    return await tryCatchFn({
        returnErrorMessage: true,
        message: "Failed to toggle user status",
        cb: async () => {
            const session = await currentSession();
            if (!session) {
                throw new Error("User not authenticated");
            }

            if (session.user.role !== "ADMIN") {
                throw new Error("User not authorized");
            }

            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: { isDisabled: true },
            });

            if (!user) {
                throw new Error("User not found");
            }

            const updated = await prisma.user.update({
                where: { id: userId },
                data: {
                    isDisabled: !user.isDisabled,
                },
                select: {
                    id: true,
                    isDisabled: true,
                },
            });
            revalidatePath('/admin/customers')
            return updated;
        },
    });
};

//3. get all users(admin)
const PAGE_SIZE = 10;

export const getAllCustomersForAdmin = async (page: number) => {
    return await tryCatchFn({
        returnErrorMessage: true,
        message: "failed to get all users",
        cb: async () => {
            const session = await currentSession();
            if (!session) {
                throw new Error("user not authenticated");
            }
            if (session.user.role !== "ADMIN") {
                throw new Error("user not authorized");
            }

            const [customers, totalCount] = await prisma.$transaction([
                prisma.user.findMany({
                    where: {
                        role: "CUSTOMER",
                    },
                    skip: (page - 1) * PAGE_SIZE,
                    take: PAGE_SIZE,
                    orderBy: {
                        createdAt: "desc",
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        username: true,
                        createdAt: true,
                        isDisabled: true,
                        profilePhoto: true,
                    },
                }),
                prisma.user.count({
                    where: {
                        role: "CUSTOMER",
                    },
                }),
            ]);

            const totalPages = Math.ceil(totalCount / PAGE_SIZE);

            return {
                customers,
                page,
                totalPages,
            };
        },
    });
};
