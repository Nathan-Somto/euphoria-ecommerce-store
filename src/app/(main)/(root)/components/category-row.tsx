'use client';
import SectionHeading from './section-heading';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
type Props = {
    data: {
        id: string;
        name: string;
        image: string;
    }[];
}
export default function CategoryRow({ data }: Props) {
    return (
        <div className="flex flex-col space-y-4 px-10">
            <SectionHeading title={'Explore Categories'} />
            <div className="flex flex-wrap gap-6">
                {data.map((category) => (
                    <div key={category.id} className="h-[300px] min-w-[350px] mt-4 w-[33%] shadow-md max-w-[500px] rounded-md relative overflow-hidden">
                        <Image src={category.image} alt={category.name} fill className="object-cover" />
                        <div className="h-full absolute z-[2] w-full bg-black/10 inset-0 flex flex-col justify-center px-6">
                            <h4 className="text-left text-3xl text-white max-w-[300px] leading-[45px] mb-1 font-semibold">{category.name}</h4>
                            <p className="text-white font-light opacity-70 mb-4 text-[16.5px]">(9) Products</p>
                            <Button variant='link' className="underline p-0 max-w-fit text-white">
                                Explore Products
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
