'use client'
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

export default function WhyUs() {
    return (
        <section className="flex flex-col gap-4 lg:gap-0 lg:flex-row max-w-screen-lg mx-auto overflow-hidden lg:rounded-lg text-white">
            <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{
                opacity: 1, 
                scale: 1, 
                transition: {
                    duration: 0.65
                }
            }} 
            className="relative rounded-lg overflow-hidden lg:rounded-none lg:h-[450px] h-[400px] lg:w-[50%] mx-auto lg:mx-0 w-[90%] lg:max-w-[500px] flex justify-center">
                <Image fill src={'/why-us/image-1.png'} alt="leaves" className="object-cover" />
                <div className="absolute z-[2] px-8 top-1/4 bottom-1/4 ">
                    <motion.h2
                        initial={{
                            opacity: 0, y: 40
                        }}
                        whileInView={{
                            opacity: 1, 
                            y: 0, 
                            transition: {
                                delay: 0.85,
                                duration: 0.55
                            }
                        }} className="md:text-3xl text-2xl max-w-[500px] font-bold leading-[40px]  md:leading-[50px]">WE MADE YOUR EVERYDAY FASHION BETTER</motion.h2>
                    <motion.p
                        initial={{
                            opacity: 0
                        }}
                        whileInView={{
                            opacity: 1, 
                            transition: {
                                delay: 1.15,
                                duration: 0.55
                            }
                        }}
                        className="font-extralight text-sm leading-relaxed opacity-80 mb-3 max-w-[400px]">
                        In our journey to improve everyday fashion, euphoria presents EVERYDAY wear range - Comfortable & Affordable fashion 24/7
                    </motion.p>
                    <motion.div
                        initial={{
                            opacity: 0
                        }}
                        whileInView={{
                            opacity: 1, transition: {
                                delay: 1.6,
                                duration: 0.55
                            }
                        }}
                    >
                        <Button variant={'white'}>
                            Shop Now
                        </Button>
                    </motion.div>
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{
                    opacity: 1, scale: 1, transition: {
                        duration: 0.65,
                        delay:0.23
                    }
                }}
                className="relative rounded-lg overflow-hidden lg:rounded-none lg:h-[450px] h-[400px] lg:w-[50%] lg:mx-0 mx-auto w-[90%] lg:max-w-[500px]">
                <Image fill src={'/why-us/image-2.png'} alt="group of friends behind a yellow background" className="object-cover" />
            </motion.div>
        </section>
    )
}