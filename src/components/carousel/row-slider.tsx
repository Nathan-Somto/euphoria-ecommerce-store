'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'

type RowSliderProps<T extends Object & {id: string}> = {
  items: T[]
  Comp: React.ComponentType<T>;
  shouldAutoPlay?: boolean
  duration?: number,
  gapX?: number
}

export default function RowSlider<T extends Object & {id: string}>({ duration = 3000, items, shouldAutoPlay = true, Comp, gapX=12 }: RowSliderProps<T>) {
  const [isHovered, setIsHovered] = useState(false)
  const [autoPlayIndex, setAutoPlayIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!shouldAutoPlay || isHovered) return
    const interval = setInterval(() => {
      if(autoPlayIndex === items.length - 1){
        scrollToStart()
      }else {
        scrollNext()
      }
    }, duration)
    return () => clearInterval(interval)
  }, [shouldAutoPlay, autoPlayIndex, isHovered, duration])

  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' })
      setAutoPlayIndex((prevIndex) => (prevIndex + 1) % items.length)
    }
  }
  const scrollToStart = () => {
    if (scrollRef.current) {
      const {scrollWidth} = scrollRef.current
      scrollRef.current.scrollTo({
        left: -scrollWidth,
        behavior: 'smooth'
      })
      setAutoPlayIndex(0)
    }
  }
  const scrollPrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' })
      setAutoPlayIndex((prevIndex) =>
        prevIndex - 1 < 0 ? items.length - 1 : prevIndex - 1
      )
    }
  }

  return (
    <div
      className="relative w-full overflow-x-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button
        variant="ghost"
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2"
        onClick={scrollPrev}
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </Button>
      <motion.div
        ref={scrollRef}
        className="flex overflow-x-scroll scrollbar-hide px-4"
        style={{gap: gapX}}
      >
        {items.map((props) => (
          <motion.div
            key={props.id}
            className="min-w-[150px] flex-shrink-0"
            viewport={{ root: scrollRef }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Comp {...props} />
          </motion.div>
        ))}
      </motion.div>
      <Button
        variant="ghost"
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
        onClick={scrollNext}
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </Button>
    </div>
  )
}
