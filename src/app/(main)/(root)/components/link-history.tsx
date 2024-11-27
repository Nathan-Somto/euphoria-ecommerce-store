import React from 'react'
import { ChevronRight } from 'lucide-react';
import Link from 'next/link'
import { cn } from '@/lib/utils';
type LinkHistoryProps = {
    links: { label: string, href: string }[]
    currentRoute?: string
    className?: string
    iconClassName?: string
}
export default function LinkHistory({ links, currentRoute, className, iconClassName }: LinkHistoryProps) {
    return (
        <div className='flex items-center'>
            {links.map((link, index) => (
                <div key={index} className={cn('flex items-center text-lg', className)}>
                    <Link href={link.href} className={`${currentRoute === link.href ? 'text-primary-foreground' : 'text-secondary-foreground'}`}>
                        {link.label}
                    </Link>
                    {index < links.length - 1 && <ChevronRight className={cn('size-4 mx-2', iconClassName)} />}
                </div>
            ))}
        </div>
    )
}
