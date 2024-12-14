'use client';
import { getCustomersOrders } from '@/actions/orders.actions'
import Pagination from '@/components/pagination'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { $Enums } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import OrderCard from './order-card';
import EmptyOrderState from './empty-order-state';
interface Props {
    data: ServerActionReturnType<typeof getCustomersOrders>['orders']
    totalPages: number
    page: number
}
interface Triggers {
    label: Capitalize<string>
    value: $Enums.Status | 'ALL'
}
const triggers: Triggers[] = [
    {
        label: 'All',
        value: 'ALL'
    },
    {
        label: 'Paid',
        value: 'PAID'
    }, {
        label: 'Delivered',
        value: 'DELIVERED'
    }, {
        label: 'Failed',
        value: 'FAILED'
    }
]
export default function OrdersList({ data, totalPages, page }: Props) {
    /* Delivered time is set by the admin */
    const searchParams = useSearchParams();
    const router = useRouter();
    const getListData = (status: Triggers['value']) => {
        if (status === 'ALL') return data;
        return data.filter(order => order.status === status)
    }
    const queryHelper = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(key, String(value));
        router.replace(`?${params.toString()}`);
    }
    const onNextPage = () => {
        //update the query params
        queryHelper('page', `${page + 1}`)
    }
    const onPreviousPage = () => {
        //update the query params
        queryHelper('page', `${page - 1}`)
    }
    const ALL = getListData('ALL');
    const PAID = getListData('PAID');
    const DELIVERED = getListData('DELIVERED');
    const FAILED = getListData('FAILED');
    return (
        <div>
            <Tabs defaultValue='ALL' >
                {/* Tab for switching between paid, delivered and failed */}
                <TabsList className='bg-transparent mb-4 w-full border-b-neutral border-b h-fit gap-x-2 !p-0 rounded-none'>
                    {triggers.map(trigger => (
                        <TabsTrigger
                            className='data-[state=active]:bg-neutral border-b-2 border-b-transparent rounded-none my-0 flex-grow data-[state=active]:border-b-primary-foreground hover:text-primary-foreground hover:bg-neutral hover:border-b-primary-foreground'
                            key={trigger.value as string}
                            value={trigger.value as string}>
                            {trigger.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {/* List of order cards */}
                <TabsContent value="ALL" className='space-y-4'>
                    {
                        ALL.length === 0 && (
                            <EmptyOrderState status='ALL' />
                        )
                    }
                    {ALL.map(order => (
                        <OrderCard key={order.id} data={order} />
                    ))}
                </TabsContent>
                <TabsContent value="PAID" className='space-y-4'>
                    {
                        PAID.length === 0 && (
                            <EmptyOrderState status='PAID' />
                        )
                    }
                    {PAID.map(order => (
                        <OrderCard key={order.id} data={order} />
                    ))}
                </TabsContent>
                <TabsContent value="DELIVERED" className='space-y-4'>
                    {
                        DELIVERED.length === 0 && (
                            <EmptyOrderState status='DELIVERED' />
                        )
                    }
                    {DELIVERED.map(order => (
                        <OrderCard key={order.id} data={order} />
                    ))}
                </TabsContent>
                <TabsContent value="FAILED" className='space-y-4'>
                    {
                        FAILED.length === 0 && (
                            <EmptyOrderState status='FAILED' />
                        )
                    }
                    {FAILED.map(order => (
                        <OrderCard key={order.id} data={order} />
                    ))}
                </TabsContent>
            </Tabs>
            {/* Pagination component */}
            <Pagination
                totalPages={totalPages}
                currentPage={page}
                disableNext={page === totalPages}
                onNext={onNextPage}
                onPrevious={onPreviousPage}
                disablePrevious={page === 1}
            />
        </div>
    )
}
