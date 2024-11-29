import React from 'react'
import DashboardHeader from '../components/dashboard-header'
import Wishlist from './components/wishlist'
import { getWishlistProducts } from '@/actions/wishlist.actions'
import ClearWishlistBtn from './components/clear-wishlist-btn';

export default async function WishlistPage() {
    const { data } = await getWishlistProducts();
    return (
        <div className='min-h-screen px-6 pt-6'>
            <div className='flex items-center justify-between my-5'>
                <DashboardHeader
                    title='Wishlist'
                    subTitle='Checkout your favorite items'
                />
                <ClearWishlistBtn />
            </div>
            <Wishlist data={data ?? []} />
        </div>
    )
}
