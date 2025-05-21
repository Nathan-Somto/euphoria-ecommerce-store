import { getWishlistProducts } from '@/actions/wishlist.actions';
import { Button } from '@/components/ui/button';
import { DEFAULT_CURRENCY } from '@/constants';
import useCart from '@/hooks/use-cart';
import { useCurrencyStore } from '@/hooks/use-currency';
import { useisInCart } from '@/hooks/use-in-cart';
import { convertToCurrency } from '@/utils/convertToCurrency';
import { ShoppingCartIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';
type WishlistItemProps = {
    product: ServerActionReturnType<typeof getWishlistProducts>[number];
    openConfirmation: (id: string, name: string) => void;
}
export default function WishlistItem({ product, openConfirmation }: WishlistItemProps) {
    const router = useRouter();
    const addToCart = useCart(state => state.addToCart);
    const isInCart = useisInCart(product.id);
    const currency = useCurrencyStore(state => state.currency);
    const onAddToCart = () => {
        console.log('add to cart')
        addToCart({
            color: product.colors[0],
            id: product.id,
            imageUrl: product.image,
            name: product.name,
            price: product.price,
            quantity: 1,
            size: product.size[0],
            total: product.price * 1,
            unitsInStock: product.units,
            discountRate: product?.discountRate ?? null
        });
        toast.success(`added ${product.name.slice(0, 40) + "..."} to cart!`)
    }
    return (
        <Link
            href={`/products/${product.id}`}
            key={product.id} className="flex items-center  justify-between py-4 border-b border-neutral">
            <div className="flex items-center">
                <Button
                    variant={'ghost'}
                    className='text-destructive hover:text-rose-200'
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openConfirmation(product.id, product.name);
                    }}
                >
                    <XIcon className="size-5" />
                    <span className='sr-only'>Remove</span>
                </Button>
                <div className="size-28 overflow-hidden ml-3 relative  rounded-md flex items-center justify-center">
                    <Image src={product.image} alt={product.name} fill className="size-full object-cover object-top" />
                </div>
                <div className="ml-4">
                    <h3 className="text-lite-foreground text-2xl mb-2">{product.name}</h3>
                    <p className="text-neutral-foreground text-[15.5px] mb-1">
                        Colors: {
                            product.colors.map((color, index) => (
                                <span
                                    key={color}
                                    style={{ backgroundColor: color }}
                                    className={`size-3 rounded-full inline-block mx-1 ${index === product.colors.length - 1 ? '' : 'mr-1'}`}
                                />
                            ))
                        }
                    </p>
                    <p className="text-neutral-foreground text-[15.5px]">
                        Category:
                        <span
                            onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/products?category=${product.category.toLowerCase()}`)
                            }}
                            className="bg-neutral-600 text-sm text-gray-100 px-1.5 py-0.5 rounded-md inline-block ml-1.5"
                        >
                            {product.category}
                        </span>
                    </p>
                </div>
            </div>
            <p className="text-neutral-foreground text-sm">{convertToCurrency(product.price, DEFAULT_CURRENCY, currency)}</p>
            <Button className='gap-x-2' disabled={isInCart} onClick={(e) => {
                e.stopPropagation()
                e.preventDefault();
                onAddToCart();
            }}>
                <ShoppingCartIcon className="size-5" />
                {
                    isInCart ? (
                        <span className='text-neutral-foreground'>In Cart</span>
                    ) : (
                        <span className='text-white'>Add to Cart</span>
                    )
                }

            </Button>
        </Link>
    )
}
