'use client';
import { getCustomerOrderDetail } from '@/actions/orders.actions';
import React from 'react'
import OrderBanner from './order-banner';
import { calculateTotal } from '@/utils/calculateTotal';
import Timeline from '@/components/timeline/timeline';
import { addMinutes, formatDate } from 'date-fns';
import Image from 'next/image';
import { useMediaQuery } from '@/hooks/use-media-query';
import { AlertCircleIcon } from 'lucide-react';
interface Props {
    data: NonNullable<ServerActionReturnType<typeof getCustomerOrderDetail>['order']>
    orderNumber: number
}
export default function OrderClient({ data, orderNumber }: Props) {
    const { isMobile } = useMediaQuery({
        mobileBreakpoint: 800
    })
    const noNullPrice = data.orderedProducts.map(item => ({ ...item, price: item.price ?? 0, discountRate: null }))
    const { actualTotal } = calculateTotal(noNullPrice)
    const calculateProgress = (status: typeof data.status | 'CONFIRMED' | 'PLACED') => {
        switch (status) {
            case 'PAID':
                return 75;
            case 'DELIVERED':
                return 100;
            case 'CONFIRMED':
                return 25;
            case 'PLACED':
                return 0;
            default:
                return 0;
        }
    }
    return (
        <div>
            <OrderBanner
                address={data.address}
                orderNumber={orderNumber}
                createdAt={data.createdAt}
                totalPrice={actualTotal}
            />
            {
                data.status === 'FAILED' ? (
                    <div className='mt-8 mb-12'>
                        <div className="size-20 hover:scale-110  bg-rose-100 hover:-translate-y-1 p-2 mb-3 mx-auto   rounded-full flex items-center justify-center">
                            <AlertCircleIcon className='text-rose-400 size-10  mx-auto' />
                        </div>
                        <p className='text-sm text-neutral-foreground text-center'>This Order failed and could not be processed</p>
                    </div>
                ) : (
                    <Timeline
                        items={[

                            {
                                label: 'Order Placed',
                                Hint: () =>
                                    <>

                                        <span className='text-neutral-foreground font-medium mr-1 inline-block'>{formatDate(data.createdAt, 'd MMMM yyy p')}</span>
                                        <span className='text-lite-foreground'>Your order was successfully placed.</span>

                                    </>
                            },
                            {
                                label: 'Order Confirmed',
                                Hint: () =>
                                    <>
                                        <span className='text-neutral-foreground font-medium mr-1 inline-block'>{formatDate(addMinutes(data.createdAt, 20), 'd MMMM yyy p')}</span>
                                        <span className='text-lite-foreground'>Your order was confirmed.</span>
                                    </>
                            },
                            {
                                label: 'In Progress',
                                Hint: () =>
                                    <>
                                        <span className='text-neutral-foreground font-medium mr-1 inline-block'>{formatDate(data.paidTime || data.createdAt, 'd MMMM yyy p')}</span>
                                        <span className='text-lite-foreground'>Your order is currently in progress as your payment was received.</span>
                                    </>
                            },
                            {
                                label: 'Order Delivered',
                                Hint: () =>
                                    <>
                                        <span className='text-neutral-foreground font-medium mr-1 inline-block'>{formatDate(data.deliveredTime || data.createdAt, 'd MMMM yyy p')}</span>
                                        <span className='text-lite-foreground'>Your order was delivered.</span>
                                    </>
                            }

                        ]}
                        variant={isMobile ? 'vertical' : 'horizontal'}
                        className='min-[800px]:w-[600px] w-[90%] mx-auto mt-8 mb-14 min-[800px]:mt-10 min-[800px]:mb-20'
                        progress={calculateProgress(data.status === 'PENDING' ? 'CONFIRMED' : data.status)}
                    />)
            }
            <div className='bg-neutral-50 rounded-[8px] shadow-sm divide-y mb-6 divide-[#BEBCBD] px-3 py-2'>
                {
                    data.orderedProducts.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-4 py-5 px-4"
                        >
                            <Image
                                src={item.image ?? ''}
                                alt={`${item.name} image`}
                                width={80}
                                height={80}
                                className="rounded-md object-cover object-top size-20"
                            />
                            <div className="flex-1">
                                <h4 className="text-sm font-medium">
                                    {item.name}{' '}
                                    <span className="opacity-80 text-xs">x{item.quantity}</span>
                                </h4>
                                <p className="text-sm mt-1 flex items-center gap-2">
                                    <span className="opacity-80">Color:</span>
                                    <span
                                        className="w-4 h-4 inline-block rounded-full border"
                                        style={{ backgroundColor: item?.color ?? 'black' }}
                                    />
                                </p>
                                <p className="text-sm mt-1 flex items-center gap-2">
                                    <span className="opacity-80">Size:</span>
                                    <span className='font-semibold'>{item?.size ?? 'MD'}</span>
                                </p>
                            </div>
                            <p className="text-base font-medium text-right opacity-80">
                                ${Math.ceil(item.quantity * (item?.price ?? 0))}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
