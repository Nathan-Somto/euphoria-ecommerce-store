import { Heading } from '@/components/ui/heading'
import React from 'react'
import OrdersClient from './components/orders-client'
import { getAdminOrders } from '@/actions/orders.actions'
import { OrdersTable } from './components'
const sampleOrder: OrdersTable = [
  {
    "products": [
      {
        "id": "befce82a-360b-4757-b791-f265d15f8114",
        "name": "Tablet",
        "price": 719.95,
        "quantity": 3
      },
      {
        "id": "21f5feba-1020-4774-abea-acd40a17d331",
        "name": "Smartwatch",
        "price": 83.58,
        "quantity": 5
      },
      {
        "id": "e1547ed0-4d2a-4f3b-95d0-35db80368860",
        "name": "Phone",
        "price": 615.62,
        "quantity": 1
      }
    ],
    "orderedProducts": undefined,
    "user": {
      "id": "2e3da602-9be7-4744-855c-adb221968a2f",
      "name": "User_56"
    },
    "address": "311 Main Street, City_91",
    "id": "59a6db76-3f75-40ee-96ff-7745cb326a0f",
    "createdAt": new Date(),
    "status": "DELIVERED"
  }]
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
  //const {data} = await getAdminOrders(page);
  return (
    <div>
      <div className="flex items-center justify-between mb-8 mt-16">
        <Heading
          title="Orders Page"
          description="review all the orders made by customers"
        />
      </div>
      <OrdersClient data={{
        orders: sampleOrder,
        page: 1,
        totalPages: 2
      }} />
    </div>
  )
}