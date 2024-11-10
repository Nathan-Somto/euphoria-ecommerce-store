'use client'
import CustomDialog from "@/components/custom-dialog";
import { Button } from "@/components/ui/button";
import { convertToCurrency } from "@/utils/convertToCurrency";
import { daysDifference } from "@/utils/daysDifference";
import { HeartIcon, AlertTriangleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

type ProductCardProps = {
    id: string,
    name: string,
    image: string,
    price: number,
    wishListProductIds: string[],
    discountRate: number | null,
    createdAt: Date,
    category: string
}

export default function ProductCard({
    id,
    name,
    image,
    price,
    wishListProductIds,
    discountRate,
    createdAt,
    category
}: ProductCardProps) {
    //TODO: implement zustand store for cart, currency conversion, wishlist
    const [isInWishList, setIsInWishList] = React.useState(false);
    const [openMustLogin, setOpenMustLogin] = React.useState(false);
    const [isAddedToCart, setIsAddedToCart] = React.useState(false);

    const isLoggedIn = false;
    const rate = 486;
    const currency: '₦' | '$' = '$';

    React.useEffect(() => {
        setIsInWishList(wishListProductIds.includes(id));
    }, [wishListProductIds]);

    const handleAddToCart = (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setIsAddedToCart(true);
        toast.success(`added ${name.slice(0,40)+"..."} to cart!`)
    };
    const handleAddToWishList = async (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
    }
    return (
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
                            <div className="inline-block bg-red-600 px-2 text-white text-sm rounded-md">
                                New
                            </div>
                        )}
                    </div>
                    <Button variant={'ghost'} onClick={handleAddToWishList} className="bg-white rounded-full p-2 size-8">
                        <HeartIcon className={`size-4 ${isInWishList ? "text-red-500" : "text-gray-500"}`} />
                    </Button>
                </div>
                <Image src={image} alt={`${name} image`} height={390} width={220} className="object-cover h-[270px] md:h-[350px] w-full" />
                <div className="flex justify-between items-center mt-2">
                    <h3 className="text-[#2A2F2F] font-bold lg:text-lg text-[16.5px] truncate">{name}</h3>
                    <p className="text-primary-foreground bg-[#F6F6F6] px-2 rounded-md py-1 text-sm lg:text-base">
                        {convertToCurrency(price, currency, rate)}
                    </p>
                </div>
                <p className="text-sm text-[#807D7E] font-medium mb-1">{category}</p>

                {/* Add to Cart Button */}
                <div className="mt-3">
                    <button
                        className="text-primary-foreground/80 underline"
                        onClick={handleAddToCart}
                        disabled={isAddedToCart}
                    >
                        {isAddedToCart ? "Added to Cart" : "Add to Cart"}
                    </button>
                </div>
            </div>

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
        </Link>
    );
}
