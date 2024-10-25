'use client';
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function FooterDownloadBtn({ store, alt, image, link, subTxt }: FooterDownloadBtnProps) {
    const router = useRouter();
    return (
        <button onClick={() => router.push(link)} className='flex gap-x-[2px] items-center max-w-[250px] bg-[#404040]'>
            <Image src={image} width={50} height={50} alt={alt} className='w-[30px] h-[30px]' />
            <div className='text-left'>
                <p className='text-xs opacity-80'>{subTxt}</p>
                <p className='text-sm'>{store}</p>
            </div>
        </button>
    )
}