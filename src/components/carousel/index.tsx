'use client';
import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type CarouselProps = {
    width: number | string;
    height: number | string;
    imgData: {
        imgSrc: string;
        alt: string;
    }[];
    itemData?: any[];
    renderItem?: (currentSlide: number, itemData: any[], showImmediately?: boolean) => React.ReactNode;
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
    const [prevSlide, setPrevSlide] = React.useState(imgData.length - 1);
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [direction, setDirection] = React.useState(-1);
    const totalSlides = imgData.length;
    const [renderCount, setRenderCount] = React.useState(0);

    const paginate = (newDirection: number) => {
        setPrevSlide(currentSlide);
        const newSlide = (currentSlide + newDirection + totalSlides) % totalSlides
        const newDirectionValue = (currentSlide + newDirection === itemData.length || newDirection < 0) ? -1 : newDirection
        setDirection(newDirectionValue);
        setCurrentSlide(newSlide);
        setRenderCount(prev => prev + 1);
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
    const currentImage = imgData[currentSlide];
    const prevImage = imgData[prevSlide];
    console.log("the prev: ", prevSlide);
    console.log("the current: ", currentSlide)
    return (
        <AnimatePresence mode="wait" >
            <motion.div
                className="relative overflow-hidden"
                style={{
                    width: width,
                    height: height
                }}
                key={'carousel'}
            >
                <motion.div
                    className='w-full'
                    style={{
                        position: 'sticky',
                        top: 0,
                        left: 0,
                        right: 0,
                        height,
                        overflow: 'hidden',
                        zIndex: -4,
                    }}
                >
                    <motion.img
                        key={prevImage.imgSrc + prevSlide}
                        src={prevImage.imgSrc}
                        alt={prevImage.alt}
                        className="object-top object-cover w-full h-full bg-fixed"
                    />
                    {renderItem(prevSlide, itemData, true)}
                </motion.div>
                <motion.div
                    key={currentImage.imgSrc + currentSlide}
                    style={{ height, overflow: 'hidden' }}
                    initial={renderCount > 0 ? { x: direction === 1 ? '-100%' : '100%' } : undefined}
                    animate={renderCount > 0 ? { x: 0 } : undefined}
                    exit={{ x: direction === 1 ? '100%' : '-100%' }}
                    transition={renderCount > 0 ? { duration: 1.2, ease: [0.33, 1, 0.68, 1] } : undefined}
                    className='z-[-2] sticky inset-0  w-full'
                >
                    <motion.img
                        src={currentImage.imgSrc}
                        alt={currentImage.alt}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        initial={{ scale: 1 }}
                        animate={{ scale: [1.05, 1] }}
                        exit={{ scale: 1 }}
                        transition={renderCount > 0 ? {
                            delay: 0.5,
                            duration: 1,
                            ease: "easeIn",
                        } : {
                            delay: 0.15,
                            duration: 0.75,
                            ease: "easeIn"
                        }}
                        className="object-top object-cover bg-fixed"
                    />
                </motion.div>
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
