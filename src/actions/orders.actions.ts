'use server';
import { currentSession } from "@/lib/next-auth";
import prisma from "@/lib/prisma";
import { clamp } from "@/utils/clamp";
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
                                    id: true,
                                    discountRate: true,
                                    images: true
                                }
                            },
                            quantity: true
                        }
                    }
                },
                skip: totalPages * page,
                take: 10
            })
            const formattedData = data.map(({ orderedProducts, ...item }) => ({
                ...item,
                products: orderedProducts.map(item => ({
                    quantity: item.quantity,
                    ...item.Product,
                    price: item?.Product?.price ?? 1,
                    discountRate: item?.Product?.discountRate ?? null,
                })),
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
export async function getCustomersOrders(page: number) {
    return await tryCatchFn({
        message: "failed to fetch customer's orders",
        cb: async () => {
            const session = await currentSession();
            if (!session) {
                throw new Error("user not authenticated")
            }
            const totalOrders = await prisma.order.findMany(
                {
                    where: {
                        AND: [
                            { userId: session.user.id },
                            {
                                NOT: {
                                    status: "PENDING"
                                }
                            }
                        ]
                    }
                }
            );
            const totalPages = Math.ceil(totalOrders.length / 10)
            const clampedPage = clamp(0, page - 1, totalPages);
            const data = await prisma.order.findMany({
                where: {
                    AND: [
                        { userId: session.user.id },
                        {
                            NOT: {
                                status: "PENDING"
                            }
                        }
                    ]
                },
                select: {
                    createdAt: true,
                    id: true,
                    status: true,
                    deliveredTime: true,
                    failedTime: true,
                    paidTime: true,
                    orderedProducts: {
                        select: {
                            id: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                },
                skip: totalPages * clampedPage,
                take: 10
            })
            const formattedData = data.map((item, index) => ({
                ...item,
                orderedProducts: item.orderedProducts.map(item => item.id),
                /* get the order number relative to its page index == 1, page === 1 page size === 10 should give 11  */
                number: (clampedPage * 10) + index + 1
            }))
            return {
                orders: formattedData,
                totalPages,
                page
            }
        },
    })
}
export async function getCustomerOrderDetail(orderId: string) {
    return await tryCatchFn({
        message: "failed to fetch customer's order",
        cb: async () => {
            const session = await currentSession();
            if (!session) {
                throw new Error("user not authenticated")
            }
            const data = await prisma.order.findFirst({
                where: {
                    AND: [
                        {
                            id: orderId
                        },
                        { userId: session.user.id },
                        {
                            NOT: {
                                status: "PENDING"
                            }
                        }
                    ],

                },
                select: {
                    createdAt: true,
                    id: true,
                    status: true,
                    address: true,
                    paidTime: true,
                    deliveredTime: true,
                    orderedProducts: {
                        select: {
                            quantity: true,
                            color: true,
                            size: true,
                            Product: {
                                select: {
                                    images: true,
                                    name: true,
                                    price: true,
                                    id: true
                                }
                            }
                        }
                    }
                }
            })
            if (data) {
                const formattedData = {
                    ...data,
                    orderedProducts: data.orderedProducts.map(({ Product, ...item }) => ({
                        ...item,
                        image: Product?.images[0] ?? null,
                        name: Product?.name ?? null,
                        price: Product?.price ?? null,
                        id: Product?.id ?? null
                    })),
                }
                return {
                    order: formattedData,
                }
            }
            return {
                order: null
            }
        },
    })
}