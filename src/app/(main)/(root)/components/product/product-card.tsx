'use client'
import CustomDialog from "@/components/custom-dialog";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { $Enums } from '@prisma/client';
import { useisInCart } from "@/hooks/use-in-cart";
import { convertToCurrency } from "@/utils/convertToCurrency";
import { daysDifference } from "@/utils/daysDifference";
import { HeartIcon, AlertTriangleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import useWishlist from "@/hooks/use-wishlist";
import { useSession } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import { HeartFillIcon } from "./icons/heart-fill-icon";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { toggleWishlist } from "@/actions/wishlist.actions";

type ProductCardProps = {
    id: string,
    name: string,
    image: string,
    price: number,
    discountRate: number | null,
    createdAt: Date,
    category: string,
    colors: string[],
    sizes: $Enums.Size[],
    unitsInStock: number
}

export default function ProductCard({
    id,
    name,
    image,
    price,
    discountRate,
    createdAt,
    category,
    colors,
    sizes,
    unitsInStock
}: ProductCardProps) {
    //TODO: implement zustand store for currency conversion
    const [isPending, startTransition] = React.useTransition();
    const { data } = useSession();
    const wishListProductIds = useWishlist(state => state.wishlistProductIds);
    const toggleOptimisticId = useWishlist(state => state.toggleOptimisticId);
    const { addToCart } = useCart();
    const [isInWishList, setIsInWishList] = React.useState(false);
    const [openMustLogin, setOpenMustLogin] = React.useState(false);
    const isInCart = useisInCart(id);
    const isInStock = unitsInStock > 0;
    const rate = 486;
    const currency: '₦' | '$' = '$';
    React.useEffect(() => {
        setIsInWishList(wishListProductIds[id] === true);
    }, [wishListProductIds]);

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const color = colors[0];
        addToCart({
            color,
            id,
            imageUrl: image,
            name,
            price,
            quantity: 1,
            size: sizes[0],
            total: price * 1,
            unitsInStock,
            discountRate
        });
        toast.success(`added ${name.slice(0, 40) + "..."} to cart!`)
    };
    const handleWishListToggle = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!data) {
            setOpenMustLogin(true);
            return;
        }
        toggleOptimisticId(id);
        startTransition(() => {
            toggleWishlist(id).catch(() => {
                toggleOptimisticId(id);
                const action = wishListProductIds[id] ? "remove" : "add";
                const where = wishListProductIds[id] ? "from" : "to";
                toast.error(`failed to ${action} ${name.slice(0, 40) + "..."} ${where} wishlist!`)
            });
        });
    }
    return (
        <>
            <Link href={`/products/${id}`} >
                <div className="relative w-[220px]">
                    <div className="absolute top-2 flex justify-between w-full px-2">
                        <div>
                            {discountRate !== null && (
                                <div className="inline-block bg-teal-600 text-sm px-2 text-white/80 mr-1 rounded-md">
                                    -{discountRate}%
                                </div>
                            )}
                            {daysDifference(createdAt, new Date()) <= 30 && (
                                <div className="inline-block bg-red-600 px-2 text-white text-sm rounded-md mr-1">
                                    New
                                </div>
                            )}
                            {
                                !isInStock &&
                                <div className="inline-block bg-lite-foreground font-semibold px-2 text-white text-sm rounded-md">
                                    Out of Stock
                                </div>
                            }
                        </div>
                        <AnimatePresence>
                            <>
                                {!isInWishList &&
                                    <Button
                                        variant={'ghost'}
                                        disabled={isPending}
                                        onClick={handleWishListToggle}
                                        className="bg-white rounded-full p-2 size-8 group hover:bg-rose-200">
                                        <HeartIcon className={`size-4 group-hover:text-rose-500 text-gray-500`} />
                                    </Button>
                                }
                                {
                                    isInWishList &&
                                    <motion.div
                                        key="wishlist-added"
                                        initial={{ scale: 0, y: -2 }}
                                        animate={{ scale: 1, y: 0 }}
                                        exit={{ scale: 0, y: -2 }}
                                        className="h-fit w-fit"
                                        transition={{ duration: 0.36, type: 'spring', stiffness: 260, damping: 20 }}
                                    >
                                        <Button
                                            variant={'ghost'}
                                            disabled={isPending}
                                            onClick={handleWishListToggle}
                                            className="rounded-full p-1.5 size-8 group hover:bg-rose-200"
                                        >
                                            <HeartFillIcon className="size-6 text-rose-500" />
                                        </Button>
                                    </motion.div>
                                }
                            </>
                        </AnimatePresence>
                    </div>
                    <Image src={image} alt={`${name} image`} height={390} width={220} className="object-cover h-[270px] md:h-[350px] w-full" />
                    <div className="flex justify-between items-center mt-2">
                        <h3 className="text-[#2A2F2F] font-bold lg:text-lg text-[16.5px] truncate">{name}</h3>
                        <p className="text-primary-foreground bg-[#F6F6F6] px-2 rounded-md py-1 text-sm lg:text-base">
                            {convertToCurrency(price, currency, rate)}
                        </p>
                    </div>
                    <p className="text-sm text-neutral-foreground font-medium mb-1">{category}</p>
                    {/* Add to Cart Button */}
                    <div className="mt-3">
                        <button
                            className={cn("text-primary-foreground/80 disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed", !isInCart && 'underline', !isInStock && '')}
                            onClick={isInStock ? handleAddToCart : undefined}
                            disabled={isInCart || !isInStock}
                        >
                            {!isInStock ? 'Out of Stock' : isInCart ? "Added to Cart" : "Add to Cart"}
                        </button>
                    </div>
                </div>

            </Link>
            <CustomDialog open={openMustLogin} setOpen={setOpenMustLogin} withTrigger={false}>
                <div className="p-4 flex flex-col items-center text-center">
                    <AlertTriangleIcon className="text-red-500 w-16 h-16 mb-2" />
                    <p className="text-lg font-semibold text-gray-700 mb-2">Login Required</p>
                    <p className="text-gray-600 mb-4">
                        You must be logged in to carry out this action!
                    </p>
                    <Link href="/auth/login" className="text-primary-foreground/80 underline">
                        Login
                    </Link>
                </div>
            </CustomDialog>
        </>
    );
}
