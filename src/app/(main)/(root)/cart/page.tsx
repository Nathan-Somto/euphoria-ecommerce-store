'use client';
import Link from 'next/link';
import React from 'react';
import LinkHistory from '../components/link-history';
import { usePathname, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CartTable from './components/cart-table';
import useCart from '@/hooks/use-cart';
import CartEmptyState from './components/cart-empty-state';
import { cn } from '@/lib/utils';
import { AlertCircleIcon, XIcon } from 'lucide-react';
import Loader from '@/components/ui/loader';
import DeleteDialog from '@/components/delete-dialog';
import { useSession } from 'next-auth/react';
import AuthDialog from '../../auth/components/auth-dialog';
import { calculateTotal } from '@/utils/calculateTotal';
import { useCurrencyStore } from '@/hooks/use-currency';
import { convertToCurrency } from '@/utils/convertToCurrency';
import { DEFAULT_CURRENCY } from '@/constants';
type InvoiceParams = Record<string, number>;
const getInvoiceData = ({ subTotal, shippingPrice, total, discountRate, originalTotal }: InvoiceParams) => {
    return [
        {
            label: 'Original Total',
            value: +originalTotal.toFixed(2)
        },
        {
            label: 'Discount rate',
            value: `${discountRate.toFixed(2)}%`
        },
        {
            label: 'Sub Total',
            value: +subTotal.toFixed(2)
        },
        {
            label: 'Shipping',
            value: +shippingPrice.toFixed(2)
        },
        {
            label: 'Total',
            value: +total.toFixed(2)
        }
    ]
}
export default function CartPage() {
    const session = useSession();
    const [isMounted, setIsMounted] = React.useState(false);
    const [openDelDialog, setOpenDelDialog] = React.useState(false);
    const [openAuthDialog, setOpenAuthDialog] = React.useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const cart = useCart(state => state.cart);
    const clearCart = useCart(state => state.clearCart);
    const { actualTotal, discountedTotal, shippingCost, totalDiscountRate, originalTotal } = calculateTotal(cart);
    const invoiceData = getInvoiceData({
        subTotal: discountedTotal,
        discountRate: totalDiscountRate,
        shippingPrice: shippingCost,
        total: actualTotal,
        originalTotal
    });
    React.useEffect(() => {
        setIsMounted(true);
    }, []);
    const currency = useCurrencyStore(state => state.currency)
    return (
        <div className={cn('min-h-screen', cart.length > 0 && 'pt-12')}>
            {!isMounted ?
                <div className='h-screen grid place-items-center'>
                    <Loader size={'lg'} />
                </div>
                : cart.length === 0 ? (
                    <CartEmptyState />
                ) : (
                    <>
                        {/* Link History */}
                        <section className="px-10 justify-between items-center lg:flex" id="top-header">
                            <div className='mb-5 lg:mb-0'>
                                <LinkHistory
                                    links={[
                                        { label: 'Home', href: '/' },
                                        { label: 'Add to Cart', href: '/cart' }
                                    ]}
                                    currentRoute={pathname}
                                />
                                <p className='text-secondary-foreground text-sm max-w-[480px] mt-3'>
                                    Please fill in the fields below and click place order to complete your purchase!{' '}
                                    {!session?.data && (<span>
                                        Already registered?{' '}
                                        <Button
                                            variant={'link'}
                                            onClick={() => setOpenAuthDialog(true)}
                                            className='text-primary font-semibold p-0'>
                                            {' '} Please login here
                                        </Button>
                                    </span>
                                    )}
                                </p>
                            </div>
                            <div>
                                <Button
                                    variant={'secondary'}
                                    onClick={() => setOpenDelDialog(true)}
                                    className='text-primary-foreground'>
                                    <XIcon className='mr-2 size-5' /> Clear Cart
                                </Button>
                                <DeleteDialog
                                    id='clear-cart'
                                    open={openDelDialog}
                                    customTemplate={{
                                        Icon: AlertCircleIcon,
                                        title: 'Clear Cart',
                                        message: 'Are you sure you want to clear your cart?',
                                    }}
                                    setOpen={setOpenDelDialog}
                                    customAction={() => {
                                        clearCart()
                                        setOpenDelDialog(false)
                                    }}
                                />
                            </div>
                        </section>

                        {/* Cart Table */}
                        <section id="cart-table" className='overflow-auto mt-8 mb-12'>
                            <CartTable />
                        </section>
                        {/* Sub Total */}
                        <section id="sub-total" className='flex flex-wrap bg-accent-foreground min-h-[368px] px-10 justify-between'>
                            <div className='min-w-[375px] flex-shrink-0 mt-10'>
                                <h4 className='mb-1.5'>Discount Codes</h4>
                                <p className='text-secondary-foreground '>Enter your coupon code if you have one</p>
                                <div className='w-full mb-6  mt-8 relative flex px-3 bg-white  rounded-xl border border-muted-foreground overflow-hidden max-w-md'>
                                    <Input className="w-full outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 ring-offset-transparent bg-transparent border-[transparent]" />
                                    <Button className='absolute right-0 rounded-tl-none rounded-bl-none'>Apply Coupon</Button>
                                </div>
                                <Button variant={'secondary'} onClick={() => router.push('/')} className='text-primary-foreground'>Continue Shopping</Button>
                            </div>
                            <div className='max-w-[400px] my-6 lg:my-0 pt-10 min-w-[350px] min-h-[300px] flex-shrink-0 w-full  bg-[hsl(0,0%,95%)]'>
                                <div className='border-b border-b-muted-foreground px-24'>
                                    {
                                        invoiceData.slice(0, -1).map((item, index) => (
                                            <div key={index} className='flex justify-between items-center font-normal text-primary-foreground'>
                                                <h4 className='text-lg !font-normal'>{item.label}</h4>
                                                <p className=' tex-sm'>{typeof item.value === 'number' ? convertToCurrency(item.value, DEFAULT_CURRENCY, currency) : item.value}</p>
                                            </div>
                                        ))
                                    }
                                    <div className='flex justify-between mt-4  text-primary-foreground pb-8 items-center'>
                                        <h4 className='text-xl font-semibold'>Total</h4>
                                        <p className='opacity-80 font-medium text-[17.5px]'>{convertToCurrency(invoiceData.at(-1)?.value as number ?? 0, DEFAULT_CURRENCY, currency)}</p>
                                    </div>
                                </div>
                                <Button
                                    onClick={() => {
                                        if (session.data) {
                                            router.push('/checkout');
                                            return
                                        }
                                        setOpenAuthDialog(true);
                                    }}
                                    className='mt-14 w-full max-w-fit mx-auto flex px-8'>
                                    {session.data ? 'Proceed to Checkout' : 'Login to Checkout'}
                                </Button>
                            </div>
                        </section>
                    </>
                )}
            <AuthDialog
                open={openAuthDialog}
                setOpen={setOpenAuthDialog}
            />
        </div>
    );
}
