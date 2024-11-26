import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function CartEmptyState() {
    return (
        <div className='px-10 bg-accent-foreground h-screen pt-12 '>
            <figure className='h-[280px] max-w-[420px] w-full relative mx-auto'>
                <Image
                    src={'/cart/empty.png'}
                    alt="Empty Cart"
                    fill
                    className='object-contain object-top mb-6'
                />
            </figure>
            <h3 className='text-2xl font-semibold mt-3  text-center'>Your cart is empty and sad 🥲</h3>
            <p className='text-center text-secondary-foreground mt-1.5'>
                Add something to make it happy!
            </p>
            <Button asChild className='mx-auto flex max-w-fit mt-10 px-12'>
                <Link href="/">Continue Shopping</Link>
            </Button>
        </div>
    )
}

export default CartEmptyState