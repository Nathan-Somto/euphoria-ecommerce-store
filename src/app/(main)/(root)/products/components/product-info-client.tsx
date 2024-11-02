'use client'
import { getProduct } from '@/actions/products.actions'
import ImageCarousel from '@/components/carousel/image-carousel'
import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'
import { pluralize } from '@/utils/pluralize'
import { renderStars } from '@/utils/renderStars'
import { LucideCreditCard, LucideShirt, LucideShoppingCart, LucideTruck, MessageSquareMoreIcon, PlayCircleIcon, PlayIcon } from 'lucide-react'
import React from 'react'
import ProductInfoTabs from './product-info-tabs'
import Image from 'next/image'
import { motion } from 'framer-motion'
type Props = {
    data: ServerActionReturnType<typeof getProduct>
}
const Perks = [
    {
        text: 'Secure Payment',
        Icon: LucideCreditCard
    },
    {
        text: 'Size & Fit',
        Icon: LucideShirt
    },
    {
        text: "Free Shipping",
        Icon: LucideTruck
    },
    {
        text: 'Customer Reviews',
        Icon: MessageSquareMoreIcon
    }
]
function ProductInfoClient({ data }: Props) {
    const [activeSize, setActiveSize] = React.useState<string | null>(data.size[0])
    const [activeColor, setActiveColor] = React.useState<string | null>(data.colors[0])
    const { isDesktop } = useMediaQuery({})
    const [addedToCart, setAddedToCart] = React.useState(false)
    const images = data.images.map((image, index) => ({ src: image, alt: `${data.name} image ${index + 1} ` }))
    return (
        <>
            <section className='grid lg:grid-cols-2 mb-5 px-12 lg:gap-x-16 max-w-screen-xl mx-auto lg:min-h-screen w-full '>
                <motion.div
                    viewport={{ once: true }}
                    className="size-full lg:min-h-screen"
                    initial={{
                        opacity: 0
                    }}
                    whileInView={{
                        opacity: 1,
                        transition: {
                            duration: 0.57,
                            ease: [0.10, 0.41, 0.05, 0.95]
                        }
                    }}
                >
                    {
                        isDesktop ? (
                            <ImageCarousel
                                images={images}
                                imageExitDirection="y"
                                indicatorOrientation="left"
                                width="100%"
                            />
                        ) : (
                            <ImageCarousel
                                images={images}
                                height={400}
                                width="100%"
                                imageExitDirection="x"
                                indicatorOrientation="bottom"
                            />
                        )
                    }
                </motion.div>
                <motion.div
                    initial={{
                        opacity: 0
                    }}
                    whileInView={{
                        opacity: 1,
                        transition: {
                            duration: 0.7,
                            ease: [0.10, 0.41, 0.05, 0.95],
                            delay: 0.35
                        }
                    }}
                    viewport={{ once: true }}
                >
                    <div className='pt-6 border-b border-[#BEBCBD] pb-7'>
                        <motion.h1
                            initial={{ y: 50, opacity: 0 }}
                            viewport={{ once: true }}
                            whileInView={{
                                y: 0, opacity: 1,
                                transition: {
                                    duration: 0.65,
                                    ease: [0.10, 0.41, 0.05, 0.95],
                                    delay: 0.4
                                }
                            }}
                            className='lg:text-6xl text-4xl leading-[35px] mb-4 font-bold lg:leading-[60px]'>{data.name}</motion.h1>
                        <div className='flex items-center gap-x-7 text-[#807D7E] mb-5'>
                            <div className='flex items-center gap-x-2'>
                                <div className='flex items-center gap-0.5'>{renderStars(5)}</div>
                                <p className=' text-lg'>4.5</p>
                            </div>
                            <div
                                className='flex items-center gap-x-2 text-lg'
                            >
                                <MessageSquareMoreIcon
                                    size={24}
                                    className='rotate-[-360deg]'
                                />
                                <p className=''>120 {pluralize('comment', 2)}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className='text-lg mb-3.5 font-medium text-[#3F4646]'>Select a Size</h3>
                            <div className='flex gap-x-4 flex-wrap'>
                                {
                                    (data.size).map(size => (
                                        <button
                                            onClick={() => setActiveSize(size)}
                                            key={size}
                                            className={
                                                cn('border-2 h-10 w-10 border-[#807D7E] rounded-xl transition ease-in delay-75 p-2',
                                                    {
                                                        'bg-[#3C4242] text-white border-transparent': activeSize === size
                                                    })}>
                                            {size}
                                        </button>
                                    ))
                                }
                            </div>
                            <h3 className='text-lg mt-5 mb-2 font-medium text-[#3F4646]'>Select a Colour</h3>
                            <div className="flex gap-x-2 flex-wrap">
                                {
                                    data.colors.map(color => (
                                        <button
                                            key={color}
                                            onClick={() => setActiveColor(color)}
                                            className={cn('size-7  flex justify-center items-center rounded-full transition ease-in delay-75 p-2', activeColor === color && 'border-2 border-[#3F4646]')}>
                                            <span style={{ backgroundColor: color }} className='size-5 flex-shrink-0 rounded-full inline-block'></span>
                                        </button>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='flex items-center gap-6 mb-6 mt-5 flex-wrap'>
                            <Button className='min-w-[200px] flex-shrink-0 tracking-[0%] text-lg h-[46px]'>
                                <LucideShoppingCart className='mr-2 size-4' />
                                {addedToCart ? 'Added to Cart' : 'Add to Cart'}
                            </Button>
                            <Button variant={'outline'} className='min-w-[138px] h-[46px]' >${
                                data.price
                            }</Button>
                        </div>
                        <div className='flex items-center gap-x-3'>
                            <Button size={'icon'} className='text-lg size-7 p-1.5'>+</Button>
                            <p className='text-lg font-medium text-primary-foreground '>1</p>
                            <Button size={'icon'} className='text-lg size-7 p-1.5'>-</Button>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 mt-5'>
                        {
                            Perks.map(({ text, Icon }) => (
                                <div key={text} className='flex items-center gap-x-3 mt-5 text-[#3C4242]'>
                                    <div className='bg-[#F6F6F6]  p-2 rounded-full size-8 flex justify-center items-center'>
                                        <Icon size={22} className='opacity-80' />
                                    </div>
                                    <p className='text-lg'>{text}</p>
                                </div>
                            ))
                        }
                    </div>
                </motion.div>
            </section>
            <section className='grid lg:grid-cols-2 mb-5 px-12 lg:gap-x-16 max-w-screen-xl mx-auto mt-16'>
                <div>
                    <ProductInfoTabs description={data.description} />
                </div>
                <div className='h-[350px] w-full max-w-[450px] aspect-video relative rounded-lg overflow-hidden'>
                    <Image src={data.images[0]} alt={'product video thumbnail'} fill className='object-cover object-top' />
                    <div className="absolute h-full w-full  bg-[#3C4242]/40 flex ">
                        <div className='h-[80%] flex flex-col justify-evenly w-full items-center px-4 self-end'>
                            <div className="bg-white size-10 rounded-full flex cursor-pointer hover:bg-opacity-50 items-center justify-center p-2">
                                <PlayIcon className='size-8 text-[#3C4242] ' />
                            </div>
                            <p className='truncate w-[80%] max-w-[350px] text-center mx-auto text-2xl font-medium text-white'>{data.description}</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductInfoClient