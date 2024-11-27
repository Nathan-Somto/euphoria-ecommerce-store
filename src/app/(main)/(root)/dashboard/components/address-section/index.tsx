import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function AddressSection({ children }: React.PropsWithChildren) {
    return (
        <section id="address-section" className='mb-6 mt-8'>
            <div className='mb-5 flex justify-between'>
                <h3 className='text-lg'>Address</h3>
                <Button asChild className='flex items-center gap-x-2' >
                    <Link href="/dashboard/address">
                        <PlusIcon />
                        New
                    </Link>
                </Button>
            </div>
            <div
                className='grid lg:grid-cols-2 gap-5'
            >{children}</div>
        </section>
    )
}
