'use server';
import prisma from "@/lib/prisma";
import { unstable_cache as cache, revalidateTag } from "next/cache";
import { tryCatchFn } from "@/utils/tryCatchFn";
import { currentSession } from "@/lib/next-auth";
//1. get all the wishtlist ids for the user (should be cached)
const getWishlistProductIds = async () => {
    return await tryCatchFn({
        cb: async () => {
            const session = await currentSession();
            if (!session) {
                throw new Error("user not authenticated")
            }
            const wishlistProductIds = await prisma.wishList.findMany({
                where: {
                    userId: session.user.id
                },
                select: {
                    productId: true
                }
            });
            // convert to this structure {[productId: string]: true}
            // allows for faster lookup O(1) instead of O(n)
            return wishlistProductIds.reduce((acc, wishlist) => ({ ...acc, [wishlist.productId]: true }), {}) as Record<string, boolean>
        },
        message: "failed to get wishlist product ids",
    })
}
//2. get all the products under a user's wishlist
const getWishlistProducts = async () => {
    return await tryCatchFn({
        cb: async () => {
            // session check happens in getWishlistProductIds
            const wishlistProductIds = await getWishlistProductIds();
            const wishlistProducts = await prisma.product.findMany({
                where: {
                    AND: [
                        {
                            id: {
                                in: Object.keys(wishlistProductIds?.data ?? {})
                            }
                        },
                        {
                            isArchived: false
                        }
                    ]
                },
                select: {
                    id: true,
                    images: true,
                    category: {
                        select: {
                            name: true
                        }
                    },
                    colors: true,
                    name: true,
                    units: true,
                    price: true,
                    size: true,
                    discountRate: true
                }
            });
            const normalizedData = wishlistProducts.map(product => ({
                ...product,
                image: product.images[0],
                category: product.category.name,
                images: undefined,
            }))
            return normalizedData;
        },
        message: "failed to get wishlist products",
    })
}
//3. add to wish list or remove from wishlist (should be one function)
const toggleWishlist = async (productId: string) => {
    return await tryCatchFn({
        cb: async () => {
            const session = await currentSession();
            if (!session) {
                throw new Error("user not authenticated")
            }
            let result;
            const exists = await prisma.wishList.findFirst({
                where: {
                    userId: session.user.id,
                    productId
                }
            });
            if (exists) {
                await prisma.wishList.deleteMany({
                    where: {
                        userId: session.user.id,
                        productId
                    }
                })
                result = false;
            } else {
                await prisma.wishList.create({
                    data: {
                        userId: session.user.id,
                        productId
                    }
                })
                result = true;
            }
            revalidateTag('wishlist');
            return result;
        },
        message: "failed to toggle wishlist",
    })
}
//4. clear all the products in the wishlist
const clearWishlist = async () => {
    return await tryCatchFn({
        cb: async () => {
            const session = await currentSession();
            if (!session) {
                throw new Error("user not authenticated")
            }
            await prisma.wishList.deleteMany({
                where: {
                    userId: session.user.id
                }
            })
            revalidateTag('wishlist')
        },
        message: "failed to clear wishlist",
    });
}
const getCachedWishlistProductIds = cache(async () => await getWishlistProductIds(), ['wishlist'], {
    tags: ['wishlist']
})
export {
    getWishlistProducts,
    toggleWishlist,
    clearWishlist,
    getCachedWishlistProductIds
};