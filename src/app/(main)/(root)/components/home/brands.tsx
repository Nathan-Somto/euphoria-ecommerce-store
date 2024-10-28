'use client';
import { motion } from "framer-motion";
import Image from "next/image"

const data = [
    {
        id: '1',
        image: '/brands/nike.png',
        alt: 'nike',
    },
    {
        id: "2",
        image: "/brands/h&m.png",
        alt: "h&m",
    },
    {
        id: "3",
        image: "/brands/levis.png",
        alt: "levis",
    },
    {
        id: "4",
        image: "/brands/polo.png",
        alt: "polo",
    },
    {
        id: "5",
        image: "/brands/puma.png",
        alt: "puma",
    }
]
export default function Brands() {
    return (
        <section className="bg-primary-foreground px-8 text-white mb-8 rounded-[12px] py-6 min-h-[357px] w-[90%] max-w-screen-lg mx-auto text-center ">
            <motion.h2 
            initial={{
                opacity: 0, y: 40
            }}
            whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.75
                    }
                }} 
            className="text-[50px] font-bold text-white mb-2 ">Top Brand Deals</motion.h2>
            <motion.p
                initial={{
                    opacity: 0
                }}
                whileInView={{
                    opacity: 1,
                    transition: {
                        delay: 0.45,
                        duration: 0.55
                    }
                }}
                className="mb-6 font-light opacity-70">up to <span className="text-[gold]">60%</span> off on brands</motion.p>
            <div className="flex justify-center items-center gap-4 flex-wrap">
                {data.map((brand, index) => (
                    <motion.div
                        key={index}
                        initial={{
                            opacity: 0,
                            scale: 0.5
                        }}
                        whileInView={{
                            opacity: 1,
                            scale: 1,
                            transition: {
                                delay: 0.65 + (index * 0.3),
                                duration: 0.55
                            }
                        }}
                        className="bg-white px-2 rounded-md grid place-items-center  flex-shrink-0 h-[85px] w-[170px]">
                        <Image src={brand.image} alt={brand.alt} key={brand.id} width={100} height={60} className="object-contain" />
                    </motion.div>
                ))}
            </div>
        </section>
    )
}