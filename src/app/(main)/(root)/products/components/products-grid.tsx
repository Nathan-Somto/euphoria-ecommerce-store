'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react'
import { ProductResponse } from '../../components/product';
import { convertToFilters, filterProducts } from './products-filter/filter-utils';
import Image from 'next/image';
import FilterBox from './products-filter/filter-box';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import ProductCard from '../../components/product/product-card';
import { ProductCardSkeleton } from '../../components/product/product-row-skeleton';
import { Loader2Icon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import ProductList from '../../components/product/product-list';
type ProductGridProps = {
    products: ProductResponse
}
function ProductsGrid({ products }: ProductGridProps) {
    // create a copy of the product response
    // based on what is showing in the url params we remove the non keys i.e does that are not  filter keys
    // we pass the filter key obj to filterProducts then we render our data
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [filters, setFilters] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [filteredResults, setFilteredResults] = React.useState(products);
    const [type, setType] = React.useState<'best' | 'new'>((searchParams.get('type') as 'best') || 'best')
    const category = searchParams.get('category') || 'all';
    const setTypeParam = (value: 'best' | 'new') => {
        setType(value)
        const urlParams = new URLSearchParams(window.location.search)
        urlParams.set('type', value)
        console.log("the created string", `${pathname}?${urlParams.toString()}`)
        router.replace(`${pathname}?${urlParams.toString()}`)
    }

    React.useEffect(() => {
        if (!isLoading) {
            setIsLoading(true);
            const paramsObj = Object.fromEntries(searchParams.entries());
            const validParamsFilter = convertToFilters(paramsObj);
            console.log("the params:", validParamsFilter);
            setFilters(validParamsFilter.map(item => item.key).join(', '))
            setFilteredResults(filterProducts(products, validParamsFilter))
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }, [searchParams]);

    return (
        <div className='px-12 lg:px-4'>
            <header className='flex w-full justify-between items-center mb-2 sticky top-[calc(20*0.25rem)] bg-white py-3 z-[30]'>
                <h3 className='text-[#3F4646] text-2xl capitalize'>{category}</h3>
                <div className='lg:flex gap-x-3 items-center hidden'>
                    <Button variant={'ghost'} className={cn("text-primary-foreground font-semibold text-xl", type === 'new' && 'text-primary hover:bg-tranparent  hover:text-primary hover:underline ')} onClick={() => setTypeParam('new')}>
                        New Arrivals
                    </Button>
                    <Button variant={'ghost'} className={cn("text-primary-foreground font-semibold text-xl", type === 'best' && 'text-primary hover:bg-tranparent  hover:text-primary hover:underline ')} onClick={() => setTypeParam('best')}>
                        Best Seller
                    </Button>
                </div>
                <Sheet >
                    <SheetTrigger asChild>
                        <Button variant="ghost" size={'icon'} className='lg:hidden'>
                            <Image src={'/products/filter.svg'} alt="filter icon" width={30} height={30} className='h-7 w-7' />
                            <span className="sr-only">filter toggle</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent className='min-h-screen max-w-xs z-[99999999] w-[295px] p-0 overflow-y-auto pt-10' >
                        <FilterBox />
                    </SheetContent>
                </Sheet>
            </header>
            <div>
                <div className={cn("gap-x-4 gap-y-6 min-[580px]:grid-cols-2 md:grid-cols-3 grid place-items-center", isLoading && 'flex justify-center items-center')}>
                    {isLoading ?
                        <div>
                            <div className="animate-spin gap-x-0.5">
                                <Loader2Icon className='size-10 text-primary' />
                            </div>
                        </div> :
                        <ProductList
                            products={filteredResults}
                            emptyTextRender={() =>
                                <>
                                    No  Products {filters.length > 0 ? `using the following filters: ` : ''}
                                    <span className="font-semibold text-primary">{filters}</span>
                                </>}
                        />
                    }
                </div>

            </div>
        </div>
    )
}

export default ProductsGrid