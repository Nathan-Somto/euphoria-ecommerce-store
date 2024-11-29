'use client';
import React from 'react'
import useWishlist, { WishlistState } from '@/hooks/use-wishlist';
type WishlistProviderProps = React.PropsWithChildren<{
    data: WishlistState
}>
export function WishlistProvider({ children, data }: WishlistProviderProps) {
    const { setWishlistProductIds } = useWishlist();
    React.useEffect(() => {
        if (data.wishlistProductIds) {
            setWishlistProductIds(data.wishlistProductIds);
        }
    }, [data.wishlistProductIds]);
    return (
        <>
            {
                children
            }
        </>
    )
}
