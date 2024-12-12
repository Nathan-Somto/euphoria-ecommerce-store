'use client';
import { Button } from '@/components/ui/button';
import useCart from '@/hooks/use-cart';
import { CheckIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { motion } from 'framer-motion';
export default function ConfirmedOrderPage() {
    const { clearCart } = useCart();
    const mounted = React.useRef(false);
    React.useEffect(() => {
        if (!mounted.current) {
            console.log('i should print once');
            mounted.current = true;
            clearCart();
            return;
        }
    }, []);
    return (
        <div className='min-h-screen grid place-items-center'>
            <motion.section
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative flex flex-col md:flex-row items-center md:gap-8 max-w-[800px] mx-auto">
                <Image
                    src="/confirmed-order/person.svg"
                    alt="Order confirmed"
                    width={500}
                    height={500}
                    className="w-[200px] hidden md:block md:w-[250px] lg:w-[500px] h-[200px] md:h-[300px] lg:h-[400px]"
                />
                {/* A box with a pointing chevron to the left in the middle is a check mark within a circular frame with lines positined in different angles resmbeling a sunshine frame underneath this object is a text as follows your order has been confirmed under the text is a button to continue shopping */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="flex justify-center md:block md:absolute md:right-[-250px] md:top-[-25px] lg:right-[-165px] lg:top-[-5px]">
                    <div className='relative h-fit w-[80%] max-w-[600px] md:h-[330px] md:w-[250px]  flex flex-col justify-center border-lite-foreground border-[2.5px] z-[50] bg-white  p-6 rounded-lg'>
                        <motion.div
                            initial={{ rotate: -180 }}
                            animate={{ rotate: 0 }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className='relative mt-4 flex justify-center items-center size-24 md:size-16 mx-auto  p-2 rounded-full border-[#D1D3D4] border'
                        >
                            <CheckIcon className='md:size-12 size-16 text-primary' />
                            <div className="hidden absolute top-[70px] left-2/4 -translate-x-2/4 -translate-y-2/4 md:grid place-items-center size-16 rounded-full -z-10">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="absolute w-[2px] h-[25px] bg-gray-300 rounded"
                                        style={{
                                            transform: `rotate(${index * 60}deg)`,
                                            transformOrigin: 'center -25px',
                                            left: index * 60 > 0 && index * 60 < 180 ? 10 : undefined,
                                            right: index * 60 > 180 ? 10 : undefined,
                                            top: index * 60 === 180 ? 5 : undefined,
                                            bottom: index * 60 === 0 ? 5 : undefined,
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                            className='text-center text-balance text-2xl mt-10 mb-1 text-lite-foreground'>
                            Your Order is Confirmed
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
                            className='text-center text-balance text-sm text-neutral-foreground mb-4'>
                            Your order has been confirmed and will be delivered to you soon.
                        </motion.p>
                        <motion.div
                            className='max-w-fit mx-auto'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.95, duration: 0.8, ease: 'easeOut' }}
                        >
                            <Button asChild className='block max-w-fit mx-auto'>
                                <Link href='/products'>
                                    Continue Shopping
                                </Link>
                            </Button>
                        </motion.div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className=' hidden md:block absolute top-[100px] -left-[30px] -translate-y-2/4 right-0 rotate-[240deg]'
                        width="50px"
                        height="50px"
                        viewBox="0 0 200 200" version="1.1">
                        <polygon style={{ fill: "none", stroke: 'hsl(var(--lite-foreground))', strokeWidth: 6 }} points="150,172 50,172 100,28" />
                    </svg>
                    <div className='z-[60] hidden md:block bg-white absolute h-[30px] rounded-tl-[3px] w-[25px] top-[90px] left-0 -translate-y-2/4 right-0'></div>
                </motion.div>
            </motion.section>
        </div>
    )
}
