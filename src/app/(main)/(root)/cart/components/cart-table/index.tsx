import useCart from '@/hooks/use-cart';
import React from 'react'
import { CartTableRow } from './row';

export default function CartTable() {
    const cartItems = useCart(state => state.cart);
    return (
        <table className='table-auto w-[calc(100%-3rem)] mx-auto rounded-md  min-w-[600px]'>
            <thead>
                <tr className='border-b border-muted  px-8 bg-primary-foreground text-white h-20 text-left font-semibold text-lg'>
                    <th className='pl-6'>Product Details</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th className='pr-3'>Action</th>
                </tr>
            </thead>
            <tbody className='w-full'>
                {cartItems.map((item) => (
                    <CartTableRow key={item.id} item={item} />
                ))}
            </tbody>
        </table>
    )
}
