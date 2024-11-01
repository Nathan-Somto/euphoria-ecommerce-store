'use client';
import { CategoryWithProducts } from '@/actions/categories.actions';
import { Button } from '@/components/ui/button'
import { DropdownMenuContent, DropdownMenuTrigger, DropdownMenu, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
type Props = {
    categories: CategoryWithProducts[]
}
export default function CategoryDropdown({ categories }: Props) {
    // fetches the category data client side
    const router = useRouter();
    const sampleData = [{
        name: "Men's Clothing",
        id: "1"
    },
    {
        name: 'Women\'s Clothing',
        id: '2'
    },
    {
        name: 'Jewelery',
        id: '3'
    }
    ]
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-x-2 outline-none hover:opacity-50">
                Category
                <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className='lg:w-44 lg:max-w-md w-[90vw] max-w-none z-[999999999999999999]'>
                {categories.map((category) => (
                    <DropdownMenuItem className="text-black/80 font-medium cursor-pointer hover:opacity-70 hover:border-none hover:border-transparent" key={category.id} onClick={() => router.push(`/products?category=${category.name}`)}>
                        {category.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
