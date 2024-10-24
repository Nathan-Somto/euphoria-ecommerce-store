'use server';
import prisma from "@/lib/prisma";
import { tryCatchFn } from "@/utils/tryCatchFn";
import { $Enums } from "prisma/prisma-client";
export async function getAdminOrders(page: number) {
    return await tryCatchFn({
        message: "failed to fetch orders",
        cb: async () => {
            const totalOrders = await prisma.order.count();
            const totalPages = Math.ceil(totalOrders / 10)
            const data = await prisma.order.findMany({
                select: {
                    createdAt: true,
                    address: true,
                    id: true,
                    status: true,
                    user: {
                        select: {
                            name: true,
                            id: true,
                        }
                    },
                    orderedProducts: {
                        select: {
                            Product: {
                                select: {
                                    name: true,
                                    price: true,
                                    id: true
                                }
                            },
                            quantity: true
                        }
                    }
                },
                skip: totalPages * page,
                take: 10
            })
            const formattedData = data.map(item => ({
                ...item,
                products: item.orderedProducts.map(item => ({
                    quantity: item.quantity,
                    ...item.Product
                })),
                orderedProducts: undefined
            }))
            return {
                orders: formattedData,
                totalPages,
                page
            }
        },
    })
}
export async function changeOrderStatus(orderId: string, status: $Enums.Status) {
    return await tryCatchFn({
        message: "failed to change status", cb: async () => {
            const data = await prisma.order.update({
                where: {
                    id: orderId
                },
                data: {
                    status
                }
            });
            return data.status;
        }
    })
}