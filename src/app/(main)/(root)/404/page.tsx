import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
    return (
        <section id="404" className='h-screen grid place-items-center'>
            <div>
                <div className='relative h-[300px] w-[350px] mx-auto grid place-items-center'>
                    <Image src={'/not-found/404.png'} alt="woman in a red coat jacket" fill className='h-[250px] !w-[180px] !left-2/4 !top-2/4 -translate-x-2/4 -translate-y-2/4  object-cover rounded-bl-[120px]' />
                    <div className='!text-[190px] flex gap-x-2 items-center w-full relative z-[20] justify-center'>
                        <h1 className='text-[150px] sm:!text-[190px]'>4</h1>
                        <h1 className='text-white text-[150px] sm:!text-[190px]'>0</h1>
                        <h1 className='skew-y-6 rotate-[28.16deg] text-[150px] sm:!text-[190px]'>4</h1>
                    </div>
                </div>
                <h2 className='mt-8 text-center mb-3.5'>
                    Oops! Page not found
                </h2>
                <p className='w-[80%] mx-auto text-neutral-foreground mb-4 text-center'>
                    The page you are looking for might have been removed or
                    temporarily unavailable.
                </p>
                <div className='mx-auto max-w-fit mt-6'>
                    <Button asChild className='px-[48px] py-3'>
                        <Link href="/">Return Home</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}