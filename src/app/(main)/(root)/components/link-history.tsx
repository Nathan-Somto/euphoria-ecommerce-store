import React from 'react'
import { ChevronRight } from 'lucide-react';
import Link from 'next/link'
type LinkHistoryProps = {
    links: { label: string, href: string }[]
    currentRoute?: string
}
export default function LinkHistory({ links, currentRoute }: LinkHistoryProps) {
    return (
        <div className='flex items-center'>
            {links.map((link, index) => (
                <div key={index} className='flex items-center text-lg'>
                    <Link href={link.href} className={`${currentRoute === link.href ? 'text-primary-foreground' : 'text-secondary-foreground'}`}>
                        {link.label}
                    </Link>
                    {index < links.length - 1 && <ChevronRight className='w-4 h-4 mx-2' />}
                </div>
            ))}
        </div>
    )
}
