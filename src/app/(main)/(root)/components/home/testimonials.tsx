'use client'
import React from 'react'
import SectionHeading from '../section-heading'
import RowSlider from '@/components/carousel/row-slider'
type TestimonialCardProps = {
    id: string,
    rating: number, // 1 - 5 (half stars allowed)
    name: string,
    message: string,
    image: string
}
function TestimonialCard({ rating, name, message, image }: TestimonialCardProps) {
    const renderStars = () => {
        const stars = [];

        const [wholenumber, decimal] = rating.toString().split('.');
        for (let i = 0; i < parseInt(wholenumber); i++) {
            stars.push('/testimonials/full-star.svg')
        }
        if (decimal) {
            stars.push('/testimonials/half-star.svg')
        }
        for (let i = stars.length; i < 5; i++) {
            stars.push('/testimonials/empty-star.svg')
        }
        return stars.map((star, index) => (
            <img key={index} src={star} alt="star" />
        ))
    }
    return (
        <div className=' border-2 border-[#BEBCBD] rounded-lg  p-6 min-h-[292px] w-96'>
            <div >
                <div className='flex justify-between mb-2'>
                    <img src={image} alt={name + "photo"} className='object-contain size-14' />
                <div className='flex items-center gap-1.5'>{renderStars()}</div>
                </div>
                    <p className='text-primary-foreground text-2xl my-5 '>{name}</p>
            </div>
            <p className='text-[#807D7E] text-sm mt-3'>{message}</p>
        </div>
    )
}
const data: TestimonialCardProps[] = [
    {
        id: '1',
        rating: 4.5,
        name: 'John Doe',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec varius ex. Nullam nec varius ex.',
        image: 'https://xsgames.co/randomusers/avatar.php?g=male'
    },
    {
        id: '2',
        image: 'https://xsgames.co/randomusers/avatar.php?g=female',
        rating: 4,
        name: 'Jane Doe',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec varius ex. Nullam nec varius ex.',
    },
    {
        id: '3',
        image: 'https://xsgames.co/randomusers/avatar.php?g=male',
        rating: 5,
        name: 'John Doe',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec varius ex. Nullam nec varius ex.',
    },
    {
        id: '4',
        image: 'https://xsgames.co/randomusers/avatar.php?g=female',
        rating: 3.5,
        name: 'Jane Doe',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec varius ex. Nullam nec varius ex.',
    },
]
export default function Testimonials() {
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
