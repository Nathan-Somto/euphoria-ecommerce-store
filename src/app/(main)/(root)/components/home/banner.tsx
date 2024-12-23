'use client';
import Carousel from '@/components/carousel';
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cachedHomeData } from '@/actions/home.actions';
interface Props {
  data: ServerActionReturnType<typeof cachedHomeData>['banner'];
}
function Banner({ data = [] }: Props) {
  const imagesWithAlt = data.map(({ image, title }) => ({ imgSrc: image, alt: `${title} banner` }));
  // change discount rate number to discount text
  const normalizedData = data.map((item) => (
    {
      ...item,
      discountText: item.discountRate ?
        (item.discountRate < 0)
          ? 'New Arrival'
          : `${item.discountRate}% off` : null,
    }
  ))
  return (
    <header className="h-[calc(100vh-(20*0.25rem))] w-full mb-8">
      <Carousel
        width="100%"
        height="100%"
        imgData={imagesWithAlt}
        duration={7000}
        shouldAutoPlay={true}
        showIndicators={true}
        itemData={normalizedData}
        renderItem={(currentSlide, itemData, showImmediately = false) => {
          const slide = itemData[currentSlide];
          return (
            <motion.div
              key={currentSlide + 'banner'}
              initial={!showImmediately ? { opacity: 0 } : undefined}
              animate={!showImmediately ? { opacity: 1, transition: { duration: 0.23, delay: 1.2 } } : undefined}
              exit={{ opacity: 0, transition: { duration: 0.23 } }}
              className="absolute inset-0 z-[2] flex items-center h-full w-full text-left  space-y-2">
              <div className="max-w-[700px]  text-left ml-[70px] lg:ml-[100px]">
                {slide.discountText && (
                  <motion.div
                    className="text-white max-w-fit  rounded-full text-sm lg:text-[16.5px] px-2 py-0.5 lg:px-4 lg:py-1 inline-block font-semibold uppercase mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    style={{ backgroundColor: slide?.discountColor }}
                  >
                    {slide.discountText}
                  </motion.div>
                )}
                <motion.h1
                  className="lg:text-6xl md:text-4xl text-3xl lg:leading-[60px]  font-bold text-white max-h-[600px]  overlfow-hidden flex flex-wrap"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        delayChildren: 1.5,
                        staggerChildren: 0.08,
                      }
                    }
                  }}
                >
                  {(slide.title as string).split(' ').map((word, index) => {
                    return <div key={word + index} className="flex flex-wrap overflow-hidden">
                      {
                        word.split('').map((char, index) => {
                          return <motion.span
                            className={index === word.split('').length - 1 ? "mr-4" : ""}
                            key={index}
                            variants={{
                              hidden: {
                                y: 100,
                                opacity: 0,
                                scale: 0.9
                              },
                              visible: {
                                y: 0,
                                opacity: 1,
                                scale: 1,
                                transition: {
                                  duration: 0.5,
                                  easings: [0.23, 0.4, 0.65, 0.12]
                                }
                              }
                            }}
                          >
                            {char}
                          </motion.span>
                        })
                      }
                    </div>
                  })}
                </motion.h1>
                <motion.p
                  className="lg:text-lg md:text-[16.5px] text-sm text-white w-[80%] opacity-75"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                >
                  {slide.description}
                </motion.p>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.8, duration: 0.5 }}
                >
                  <Button className="bg-white text-black px-4 py-2 mt-4 hover:bg-white hover:opacity-50">
                    {slide.buttonText}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          );
        }}
      />
    </header>
  );
}

export default Banner;
