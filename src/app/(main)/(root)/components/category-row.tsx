import { pluralize } from '@/utils/pluralize';
import Image from 'next/image';
import Link from 'next/link';
type Props = {
    data: {
        id: string;
        name: string;
        image: string;
        totalProducts: number;
    }[];
}

export default function CategoryRow({ data }: Props) {
    return (
        <div className="flex flex-col space-y-4 mb-4 mt-3 w-full px-4">
            <div className="grid md:grid-cols-2 gap-3 w-full justify-items-stretch max-w-screen-lg mx-auto">
                {data.map((category) => (
                    <div key={category.id} className="h-[300px] min-w-[300px] mx-auto w-full mt-4  shadow-md max-w-[500px] rounded-md relative overflow-hidden">
                        <Image src={category.image} alt={category.name} fill className="object-cover" />
                        <div className="h-full absolute z-[2] w-full bg-black/10 inset-0 flex flex-col justify-center px-6">
                            <h4 className="text-left text-3xl text-white max-w-[300px] leading-[45px] mb-1 font-semibold">{category.name}</h4>
                            <p className="text-white font-light opacity-70 mb-4 text-[16.5px]">({category.totalProducts}) {pluralize('Product', category.totalProducts)}</p>
                            <Link href={`/products?category=${category.name.toLowerCase()}`} className="underline p-0 max-w-fit text-white">
                                Explore Products
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
