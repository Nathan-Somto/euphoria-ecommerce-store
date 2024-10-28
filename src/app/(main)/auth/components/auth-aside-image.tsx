'use client';
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image';
import { usePathname } from 'next/navigation';
type Props<T> = {
    images: {
       [i in keyof T]: 
       {
        alt: string;
        image: string;
       }
    }
}
export default function AuthAsideImage<T>({images}: Props<T>) {
    const pathname = usePathname();
    const pathnameWithoutId = pathname.split('/').slice(0, 3).join('/');
    const {alt, image} = images[pathnameWithoutId as keyof T];
  return (
    <motion.aside className='lg:min-h-[calc(100vh-(20*0.25rem))] lg:h-auto h-[300px] relative lg:w-[45%] flex-shrink-0 w-[95%] rounded-md lg:rounded-none overflow-hidden mx-auto lg:mx-0'>
        <figure className='min-h-full w-full relative'>
            <Image src={'/auth'+image} alt={alt} fill className='object-cover object-center' />
        </figure>
    </motion.aside>
  )
}
