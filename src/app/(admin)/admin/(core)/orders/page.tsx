import { Heading } from '@/components/ui/heading'
import React from 'react'
import OrdersClient from './components/orders-client'
import { getAdminOrders } from '@/actions/orders.actions'
export default async function OrdersPage(
  {
    searchParams,
  }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }
) {

  let page: number | string | string[] = (await searchParams).page ?? '1';
  if (typeof page === 'string') {
    page = parseInt(page);
  } else if (Array.isArray(page)) {
    page = parseInt(page[0]);
  }
  const { data } = await getAdminOrders(page);
  console.log("orders data:", JSON.stringify(data, null, 2));
  return (
    <div>
      <div className="flex items-center justify-between mb-8 mt-16">
        <Heading
          title="Orders Page"
          description="review all the orders made by customers"
        />
      </div>
      <OrdersClient data={{
        orders: data?.orders ?? [],
        page: data?.page ?? 1,
        totalPages: data?.totalPages ?? 1
      }} />
    </div>
  )
}