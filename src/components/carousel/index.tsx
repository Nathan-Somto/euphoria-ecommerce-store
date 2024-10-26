'use client';
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Progress } from '../ui/progress'
type CarouselProps = {
    width: number | string,
    height: number | string,
    imgData: {
        imgSrc: string,
        alt: string
    }[],
    children?: React.ReactNode,
    shouldAutoPlay: boolean,
    duration: number,
    showIndicators: boolean
}
export default function Carousel({ width = '100%', height = '100%', imgData, shouldAutoPlay, duration, showIndicators }: CarouselProps) {
    const [currentSlide, setCurrentSlide] = React.useState(0)
    // Carousel should be swipeable
    // should have indicators at the bottom
    // should allow for auto playing at a set duration
    const paginate = (newSlide: number) => {
        const newSlideIndex = currentSlide + newSlide
        if (newSlideIndex < 0) {
            setCurrentSlide(imgData.length - 1)
        } else if (newSlideIndex >= imgData.length) {
            setCurrentSlide(0)
        } else {
            setCurrentSlide(newSlideIndex)
        }
    }
    return (
        <AnimatePresence initial={false}>
            <motion.div className='relative' style={{
                width: width,
                height: height
            }}>
                <motion.div
                    drag="x"
                    key={currentSlide}
                    dragConstraints={{ left: 0, right: 0 }}
                    initial={{ x: width, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -width, opacity: 0 }}
                >
                    <motion.img
                        src={imgData[currentSlide].imgSrc}
                        alt={imgData[currentSlide].alt}
                        style={{
                            width: '100%',
                            height: '100%'
                        }}
                    />
                    {/* The indicator is a pill type progress bar */}
                    {/* If i touch a region of the progress bar */}
                    <Progress value={(currentSlide / imgData.length) * 100} />
                </motion.div>
                <div className="next" onClick={() => paginate(1)}>
                    <img src={'/carousel/next.svg'} alt="next" />
                </div>
                <div className="prev" onClick={() => paginate(-1)}>
                   <img src={'/carousel/prev.svg'} alt="prev" />
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
