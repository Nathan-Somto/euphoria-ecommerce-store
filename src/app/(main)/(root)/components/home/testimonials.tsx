'use client'
import React from 'react'
import SectionHeading from '../section-heading'
import RowSlider from '@/components/carousel/row-slider'
import { Rating, renderStars } from '@/utils/renderStars'
import { cachedHomeData } from '@/actions/home.actions'
type TestimonialCardProps = {
    id: string,
    rating: number, // 1 - 5 (half stars allowed)
    name: string,
    message: string,
    image: string
}
function TestimonialCard({ rating, name, message, image }: TestimonialCardProps) {
    return (
        <div className=' border-2 border-[#BEBCBD] rounded-lg  p-6 min-h-[292px] w-96'>
            <div >
                <div className='flex justify-between mb-2'>
                    <img src={image} alt={name + "photo"} className='object-contain size-14 rounded-full' />
                    <div className='flex items-center gap-1.5'>{renderStars(rating as Rating)}</div>
                </div>
                <p className='text-primary-foreground text-2xl my-5 '>{name}</p>
            </div>
            <p className='text-[#807D7E] text-sm mt-3'>{message}</p>
        </div>
    )
}

interface TestimonialsProps {
    data: ServerActionReturnType<typeof cachedHomeData>['testimonials'];
}
export default function Testimonials({ data = [] }: TestimonialsProps) {
    return (
        <section id="feedback" className='max-w-screen-lg w-[90%] my-20 mx-auto space-y-10'>
            <SectionHeading title="Feedback" />
            <RowSlider
                items={data}
                Comp={TestimonialCard}
                duration={3000}
                gapX={24}
            />
        </section>
    )
}
