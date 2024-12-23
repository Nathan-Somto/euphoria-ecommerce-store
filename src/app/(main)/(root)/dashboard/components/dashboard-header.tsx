import React from 'react'
import BackBtn from './back-btn'
type Props = {
    title: string
    subTitle?: string
    showBackBtn?: boolean
}
export default function DashboardHeader({ title, subTitle, showBackBtn = false }: Props) {
    return (
        <header className='text-lite-foreground mb-4'>
            <div className="flex items-center mb-2">
                {showBackBtn && (
                    <BackBtn
                        className='mr-1 !p-0'
                    />
                )}
                <h1 className='text-[28px] leading-[33.5px]'>{title}</h1>
            </div>
            {subTitle && <p className='text-xl opacity-80'>{subTitle}</p>}
        </header>
    )
}
