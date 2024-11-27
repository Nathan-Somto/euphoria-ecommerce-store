'use server'
import { currentSession } from "@/lib/next-auth"
import { tryCatchFn } from "@/utils/tryCatchFn"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"
// helper function to normalize default address no need to catch errors
const normalizeDefaultAddress = async (userId: string, isDefault: boolean) => {
    if (!isDefault) return;
    await prisma?.address.updateMany({
        where: {
            userId
        },
        data: {
            isDefault: false
        }
    })
}
//1. create an address 
const createAddress = async (data: Omit<Address, 'id'>) => {
    return await tryCatchFn({
        returnErrorMessage: true,
        message: "failed to create address",
        cb: async () => {
            const session = await currentSession();
            if (!session) {
                throw new Error("user not authenticated")
            }
            await normalizeDefaultAddress(session.user.id, data.isDefault)
            const address = await prisma?.address.create({
                data: {
                    city: data.city,
                    country: data.country,
                    phoneNumber: data.phoneNumber,
                    state: data.state,
                    street: data.street,
                    zip: data.zip,
                    userId: session.user.id,
                    isDefault: data.isDefault
                }
            })
            revalidatePath('/dashboard')
            return address
        }
    })
}
//2. edit an address
const editAddress = async (data: Partial<Address>, addressId: string) => {
    return await tryCatchFn({
        returnErrorMessage: true,
        message: "failed to edit address",
        cb: async () => {
            const session = await currentSession();
            if (!session) {
                throw new Error("user not authenticated")
            }
            const existingAddress = await prisma?.address.findFirst({
                where: {
                    id: addressId
                }
            })
            if (!existingAddress) {
                throw new Error("address not found")
            }
            await normalizeDefaultAddress(session.user.id, data.isDefault ?? existingAddress.isDefault)
            const address = await prisma?.address.update({
                where: {
                    id: addressId
                },
                data: {
                    city: data.city ?? existingAddress.city,
                    country: data.country ?? existingAddress.country,
                    phoneNumber: data.phoneNumber ?? existingAddress.phoneNumber,
                    state: data.state ?? existingAddress.state,
                    street: data.street ?? existingAddress.street,
                    zip: data.zip ?? existingAddress.zip,
                    isDefault: data.isDefault ?? existingAddress.isDefault
                }
            })
            revalidatePath('/dashboard')
            return address
        }
    })
}
//3. delete an address
const deleteAddress = async (addressId: string) => {
    return await tryCatchFn({
        returnErrorMessage: true,
        message: "failed to delete address",
        cb: async () => {
            const session = await currentSession();
            if (!session) {
                throw new Error("user not authenticated")
            }
            const address = await prisma?.address.delete({
                where: {
                    id: addressId
                }
            })
            revalidatePath('/dashboard')
            return address
        }
    })
}
//4. get all addresses for a particular user
const getAddresses = async () => {
    return await tryCatchFn({
        returnErrorMessage: true,
        message: "failed to get addresses",
        cb: async () => {
            const session = await currentSession();
            if (!session) {
                throw new Error("user not authenticated")
            }
            const addresses = await prisma?.address.findMany({
                where: {
                    userId: session.user.id
                }
            })
            return addresses ?? []
        }
    })
}
const getAddress = async (addressId: string) => {
    return await tryCatchFn({
        returnErrorMessage: true,
        message: "failed to get addresses",
        cb: async () => {
            const session = await currentSession();
            if (!session) {
                throw new Error("user not authenticated")
            }
            const address = await prisma?.address.findFirst({
                where: {
                    AND: [
                        {
                            userId: session.user.id
                        },
                        {
                            id: addressId
                        }
                    ]
                }
            })
            return address ?? undefined
        }
    })
}
export {
    createAddress,
    editAddress,
    deleteAddress,
    getAddresses,
    getAddress
}