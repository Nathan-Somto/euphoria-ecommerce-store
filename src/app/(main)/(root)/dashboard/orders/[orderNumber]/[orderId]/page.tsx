import { getCustomerOrderDetail } from '@/actions/orders.actions';
import React from 'react'
import OrderClient from '../../components/order-client';
import { redirect } from 'next/navigation';
import DashboardHeader from '../../../components/dashboard-header';

export default async function OrderPage({ params: { orderNumber, orderId } }: {
    params: {
        orderNumber: string | string[],
        orderId: string | string[]
    }
}) {
    let orderNumberValue = (Array.isArray(orderNumber)) ? +orderNumber[0] : +orderNumber;
    orderNumberValue = isNaN(orderNumberValue) ? 0 : orderNumberValue;
    const orderIdValue = (Array.isArray(orderId)) ? orderId[0] : orderId;
    const { data } = await getCustomerOrderDetail(orderIdValue);
    if (!data || data.order === null) redirect('/404');
    return (
        <div className='min-h-screen px-6 pt-6'>
            <DashboardHeader
                title='Order Details'
                showBackBtn
            />
            <OrderClient
                data={data.order}
                orderNumber={orderNumberValue}
            />
        </div>
    )
}
