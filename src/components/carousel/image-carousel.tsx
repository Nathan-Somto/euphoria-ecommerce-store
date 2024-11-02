'use client'
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

type Props = {
    indicatorOrientation?: 'bottom' | 'left' | 'right';
    images: { src: string, alt: string }[];
    width?: number | string;
    height?: number | string;
    imageExitDirection: 'x' | 'y';
};

function ImageCarousel({
    indicatorOrientation = 'left',
    images,
    height = '100%',
    width = 400,
    imageExitDirection
}: Props) {
    const [renderCount, setRenderCount] = React.useState(0);
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [prevSlide, setPrevSlide] = React.useState(0);
    const [direction, setDirection] = React.useState<-1 | 1>(-1);
    const paginate = (newSlide: number, oldSlide: number) => {
        setDirection(newSlide > oldSlide ? 1 : -1);
        setPrevSlide(oldSlide);
        setCurrentSlide(newSlide);
        setRenderCount(prev => prev + 1);
    };


    const handleDragEnd = (event: any, info: any) => {
        if (imageExitDirection === 'x') {
            if (info.offset.x > 100) {
                paginate(-1, currentSlide);
            } else if (info.offset.x < -100) {
                paginate(1, currentSlide);
            }
        }
        else {
            if (info.offset.y > 100) {
                paginate(-1, currentSlide);
            } else if (info.offset.y < -100) {
                paginate(1, currentSlide);
            }
        }
    };
    return (
        <div className="relative overflow-hidden h-full" >
            <div className={cn("relative overflow-hidden")}
                style={{
                    width: indicatorOrientation !== 'bottom' ? `calc(${width}px - ( 24 * 0.25rem))` : width,
                    height: indicatorOrientation === 'bottom' ? `calc(${height}px - ( 24 * 0.25rem))` : height,
                    marginLeft: indicatorOrientation === 'left' ? 'calc(24 * 0.25rem)' : undefined,
                    marginRight: indicatorOrientation === 'right' ? 'calc(24 * 0.25rem)' : undefined,
                    marginBottom: indicatorOrientation === 'bottom' ? 'calc(24 * 0.25rem)' : undefined,
                }}
            >
                {/* Exiting Image */}
                <motion.div
                    key={images[prevSlide].src + prevSlide}
                    initial={{
                        x: imageExitDirection === 'x' ? 0 : undefined,
                        y: imageExitDirection === 'y' ? 0 : undefined,
                        opacity: 1
                    }}
                    drag={imageExitDirection}
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    onDragEnd={handleDragEnd}
                    className='h-full w-full'
                    animate={renderCount > 0 ? {
                        x: imageExitDirection === 'x' ? (direction === 1 ? '-100%' : '100%') : undefined,
                        y: imageExitDirection === 'y' ? (direction === 1 ? '-100%' : '100%') : undefined,
                        opacity: 0,
                        transition: { duration: 0.85, type: 'tween' }
                    } : undefined}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                    }}
                >
                    <Image
                        src={images[prevSlide].src}
                        alt={images[prevSlide].alt}
                        fill
                        className="object-cover object-top lg:object-center w-full h-full"
                    />
                </motion.div>

                {/* Entering Image */}
                <motion.div
                    key={images[currentSlide].src + currentSlide}
                    initial={renderCount > 0 ? {
                        x: imageExitDirection === 'x' ? (direction === 1 ? '100%' : '-100%') : undefined,
                        y: imageExitDirection === 'y' ? (direction === 1 ? '100%' : '-100%') : undefined,
                        opacity: 0
                    } : undefined}
                    drag={imageExitDirection}
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    onDragEnd={handleDragEnd}
                    animate={renderCount > 0 ? {
                        x: imageExitDirection === 'x' ? 0 : undefined,
                        y: imageExitDirection === 'y' ? 0 : undefined, opacity: 1
                    } : undefined}
                    transition={{ type: 'tween', duration: 0.85 }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                    }}
                    className='h-full w-full'
                >
                    <Image
                        src={images[currentSlide].src}
                        alt={images[currentSlide].alt}
                        fill
                        className="object-cover object-top lg:object-center w-full h-full"
                    />
                </motion.div>
            </div>
            <div
                className={cn('absolute flex h-full top-0 z-50', {
                    'bottom-0 w-full h-fit top-auto': indicatorOrientation === 'bottom',
                    'left-0': indicatorOrientation === 'left',
                    'right-0': indicatorOrientation === 'right'
                })}
            >
                <div
                    className={cn(
                        'flex space-y-4 flex-col items-center justify-center',
                        indicatorOrientation === 'bottom' && 'flex-row space-x-4 space-y-0 w-full'
                    )}
                >
                    {images.map((_, index) => (
                        <motion.div
                            key={index}
                            className={cn(
                                'bg-white p-0.5 grid place-items-center h-20 w-20 rounded-[8px] cursor-pointer overflow-hidden',
                                currentSlide === index ? 'border-primary-foreground border' : 'border-0'
                            )}
                            onClick={() => paginate(index, currentSlide)}
                        >
                            <motion.img
                                key={index}
                                src={images[index].src}
                                alt={images[index].alt}
                                whileHover={{ scale: 1.2 }}
                                transition={{ duration: 0.85 }}
                                className="w-20 h-20 object-cover rounded-[8px]"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ImageCarousel;
