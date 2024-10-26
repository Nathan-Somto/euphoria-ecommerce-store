import Carousel from '@/components/carousel'
import React from 'react'

function Banner() {
  return (
    <header className='h-screen min-h-[380px] border border-destructive w-full mb-8'>
      <Carousel 
      width='100%' 
      height='100%' 
      imgData={[
        {
          imgSrc: '/carousel/banner-1.jpg',
          alt: 'banner1'
        },
        {
          imgSrc: '/carousel/banner-2.png',
          alt: 'banner2'
        },
        {
          imgSrc: '/carousel/banner-3.png',
          alt: 'banner3'
        }
      ]} 
      duration={3000} 
      shouldAutoPlay={true} 
      showIndicators={true} />
    </header>
  )
}

export default Banner