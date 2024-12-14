import React from 'react'
import DashboardHeader from '../components/dashboard-header'
import { getCustomersOrders } from '@/actions/orders.actions';
import OrdersList from './components/orders-list';

export default async function OrdersPage({ searchParams: {
    page = '1'
} }: {
    searchParams: {
        page?: string | string[]
    }
}) {
    let pageValue = (Array.isArray(page)) ? page[0] : page;
    let pageAsNumber = page === undefined ? 1 : parseInt(pageValue);
    pageAsNumber = isNaN(pageAsNumber) ? 1 : pageAsNumber;
    const { data } = await getCustomersOrders(pageAsNumber);
    console.log("the data: ", data);
    return (
        <div className='min-h-screen px-6 pt-6'>
            <DashboardHeader
                title='My Orders'
            />
            <OrdersList
                data={data?.orders ?? []}
                totalPages={data?.totalPages ?? 1}
                page={data?.page ?? 1}
            />
        </div>
    )
}
