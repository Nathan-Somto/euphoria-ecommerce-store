import React from 'react'
type Props = {
    title: string
    subTitle?: string
}
export default function DashboardHeader({ title, subTitle }: Props) {
    return (
        <header className='text-lite-foreground mb-4'>
            <h1 className='text-[28px] leading-[33.5px] mb-2'>{title}</h1>
            {subTitle && <p className='text-xl opacity-80'>{subTitle}</p>}
        </header>
    )
}
