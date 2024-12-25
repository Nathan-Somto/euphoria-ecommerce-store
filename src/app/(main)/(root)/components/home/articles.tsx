'use client';
import React from 'react'
import SectionHeading from '../section-heading'
import Image from 'next/image';
import { motion } from 'framer-motion'
const blogArticles = [
    {
        title: "Hawaiin\nPrints",
        description: "how to make the hawaiin look work for you, no matter the occasion.",
        imageUrl: "https://res.cloudinary.com/dj4t8vc0g/image/upload/v1734929399/hawaiin_uyaryy.png",
        position: 'left',
        color: 'white'
    },
    {
        title: "Rebel\nShirts",
        description: "Rebel against the norm and stand out with unique streetwear.",
        imageUrl: "https://res.cloudinary.com/dj4t8vc0g/image/upload/v1734929400/tshirt_kx3get.png",
        color: 'white'
    },
    {
        title: "Althetic\nFun",
        description: "Stay comfortable and stylish in altheisure wear that moves with you.",
        imageUrl: "https://res.cloudinary.com/dj4t8vc0g/image/upload/v1734929397/joggers_xilwps.png",
    },
    {
        title: "Corporate\nChic",
        description: "Corporate wear doesn't have to be boring. Look sharp and feel great.",
        imageUrl: "https://res.cloudinary.com/dj4t8vc0g/image/upload/v1734929558/casual-shirt_otvkv6.png",
    },
    {
        title: "Oversized\nTees",
        description: "oversized t-shirts are the latest trend, see why they're so popular.",
        imageUrl: "https://res.cloudinary.com/dj4t8vc0g/image/upload/v1734929557/oversized_e3izvp.png",
    },
];

export default function Articles() {
    return (
        <section id="articles"
            className='max-w-screen-lg w-[90%] my-20 mx-auto space-y-10'>
            <SectionHeading title="Latest Articles" />
            <div className='grid mt-7 grid-cols-1 gap-6 md:grid-cols-2 grid-flow-row-dense md:gap-5 lg:grid-cols-12 lg:gap-3'>
                {blogArticles.map((article, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: index * 0.1 } }}
                        key={index + article.title} className={` relative rounded-lg ${index >= 3 ? index === 4 ? 'lg:col-span-6 md:col-span-2' : 'lg:col-span-6' : 'lg:col-span-4'}`}>
                        <Image
                            src={article.imageUrl}
                            alt={article.title}
                            height={300}
                            width={700}
                            className='w-full h-[300px] lg:h-[393px] object-top object-cover rounded-lg' />
                        <div className={`absolute   flex flex-col  gap-y-4 sm:gap-y-2 md:gap-y-4 ${article?.color === 'white' ? 'text-white' : 'text-lite-foreground'} ${article?.position === 'left' ? 'top-10 sm:top-8 lg:top-20 left-5 xl:left-10' : 'top-10 sm:top-8 lg:top-20 right-5 xl:right-10 items-end'} z-[8] bottom-0 w-full`}>
                            <h3 className='font-semibold w-1/2  text-2xl sm:text-base md:text-2xl lg:text-4xl'>{article.title}</h3>
                            <p className='text-sm mt-2 w-[50%] '>{article.description}</p>
                            <div className='w-[50%]'>
                                {
                                    article?.color === 'white' ?

                                        <button className="bg-transparent border border-white text-white font-medium rounded py-1 px-3 lg:px-4 text-base sm:text-xs md:text-base hover:bg-white hover:text-lite-foreground transition-all duration-300">Read More</button>
                                        :
                                        <button className="bg-transparent border border-lite-foreground text-lite-foreground font-medium rounded py-1 px-3 lg:px-4 text-base sm:text-xs md:text-base  hover:bg-lite-foreground hover:text-white transition-all duration-300">Read More</button>
                                }
                            </div>
                        </div>

                        <div className={`absolute ${article?.color === 'white' ? 'bg-black/15' : 'bg-black/5'} w-full h-full inset-0 z-[3] rounded-lg`}></div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
