'use client';
import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Progress } from '../ui/progress';
import { cn } from '@/lib/utils';

type CarouselProps = {
    width: number | string;
    height: number | string;
    imgData: {
        imgSrc: string;
        alt: string;
    }[];
    itemData?: any[];
    renderItem?: (currentSlide: number, itemData: any[]) => React.ReactNode;
    shouldAutoPlay: boolean;
    duration: number;
    showIndicators: boolean;
};

export default function Carousel({
    width = '100%',
    height = '100%',
    imgData,
    shouldAutoPlay,
    duration = 3000,
    showIndicators,
    itemData = [],
    renderItem = (currentSlide: number, itemData: any[]) => <></>
}: CarouselProps) {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [direction, setDirection] = React.useState(-1);
    const totalSlides = imgData.length;


    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentSlide((prev) => (prev + newDirection + totalSlides) % totalSlides);
    };


    const handleDragEnd = (event: any, info: any) => {
        if (info.offset.x > 100) {
            paginate(-1);
        } else if (info.offset.x < -100) {
            paginate(1);
        }
    };

    useEffect(() => {
        if (shouldAutoPlay) {
            const timer = setInterval(() => paginate(1), duration);
            return () => clearInterval(timer);
        }
    }, [currentSlide, shouldAutoPlay, duration]);
    const { imgSrc, alt } = imgData[currentSlide]
    return (
        <AnimatePresence mode="wait" initial={false} >
            <motion.div
                className="relative overflow-hidden"
                style={{
                    width: width,
                    height: height
                }}
                key={imgSrc}
            >
                <motion.div
                    key={imgSrc}
                    drag="x"
                    onDragEnd={handleDragEnd}
                    style={{ height, overflow: 'hidden' }}
                    dragConstraints={{ left: 0, right: 0 }}
                    initial={{ x: direction === 1 ? '100%' : '-100%', opacity: 0, zIndex: -3 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: direction === 1 ? '-100%' : '100%', opacity: 0, zIndex: -2 }}
                    transition={{ duration: 0.75, ease: 'easeIn', }}
                >
                    <motion.img
                        src={imgSrc}
                        alt={alt}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.05 }}
                        exit={{ scale: 1 }}
                        transition={{
                            delay: 0.5,
                            duration: 1,
                            ease: "easeIn",
                        }}
                        className="object-center object-cover"
                    />
                </motion.div>
                {/* Overlay */}
                <div className="z-[0] absolute h-full w-full inset-0 bg-black/30"></div>
                {renderItem(currentSlide, itemData)}
                {showIndicators && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 1.5, duration: 0.5 } }}
                        exit={{ opacity: 0, transition: { duration: 0.245 } }}
                        className="bottom-4 absolute mx-auto inset-x-0 z-[3] w-[200px] flex gap-x-2 justify-center">
                        {imgData.map((_, index) => <motion.div
                            key={index}
                            initial={{
                                height: 12,
                                width: 12,
                                backgroundColor: "rgb(0 0 0 / 0.5)"
                            }}
                            animate={index === currentSlide ?
                                {
                                    height: 12,
                                    width: 36,
                                    backgroundColor: 'white',
                                    transition: { duration: 0.45, delay: 1.8 }
                                } : {}}
                            onClick={() => paginate(index)}
                            className={cn("rounded-full  cursor-pointer")}
                        />
                        )}
                    </motion.div>
                )}
                <div
                    className="absolute right-3 top-2/4 z-[2] cursor-pointer hover:scale-110 hover:opacity-50"
                    onClick={() => paginate(1)}
                >
                    <img src={'/carousel/next.svg'} alt="next" className="lg:size-10 size-7" />
                </div>
                <div
                    className="absolute left-3 top-2/4 z-[2] cursor-pointer hover:scale-110 hover:opacity-50"
                    onClick={() => paginate(-1)}
                >
                    <img src={'/carousel/prev.svg'} alt="prev" className="lg:size-10 size-7" />
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
