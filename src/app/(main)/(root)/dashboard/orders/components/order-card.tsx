import { getCustomersOrders } from '@/actions/orders.actions'
import { addDays, formatDate } from 'date-fns'
import Link from 'next/link'
import React from 'react'
interface Props {
    data: ServerActionReturnType<typeof getCustomersOrders>['orders'][number]
}
export default function OrderCard({ data }: Props) {
    const getImportantDate = () => {
        // returns either the expected delivery date, or the date the order was paid for or the failed date with the appropriate status label
        if (data.status === 'PAID') {
            return {
                label: 'Estimated Delivery Date',
                // 5 days from the date the order was paid for
                date: addDays(new Date(data.paidTime || data.createdAt), 5)
            }
        }
        if (data.status === 'DELIVERED') {
            return {
                label: 'Delivered At',
                date: data.deliveredTime || data.createdAt
            }
        }
        return {
            label: 'Failed At',
            date: data.failedTime || data.createdAt
        }
    }
    const { label, date } = getImportantDate();
    return (
        <Link href={`/dashboard/orders/${data.number}/${data.id}`}>
            <article className="flex flex-col justify-between p-4 bg-neutral shadow-sm rounded-lg my-5">
                <h3 className="text-lg font-semibold">Order no: #{data.number}</h3>
                <div className="grid grid-cols-2  mt-3 justify-items-end">
                    <div className="flex items-center gap-x-1" style={{
                        justifySelf: 'flex-start'
                    }}>
                        <p className="text-sm text-neutral-foreground font-medium">Created At:</p>
                        <p className="text-sm text-muted-foreground">{
                            formatDate(data.createdAt, 'do MMMM yyyy')
                        }
                        </p>
                    </div>
                    <div className="flex items-center gap-x-1" >
                        <p className="text-sm text-neutral-foreground font-medium">Status:</p>
                        <p className="text-sm  lowercase text-muted-foreground">{data.status}</p>
                    </div>
                    <div className="flex items-center gap-x-1"
                        style={{
                            justifySelf: 'flex-start'
                        }}
                    >
                        <p className="text-sm text-neutral-foreground font-medium">{label}:</p>
                        <p className="text-sm text-muted-foreground">{
                            formatDate(date, 'do MMMM yyyy')
                        }</p>
                    </div>
                    <div className="flex items-center gap-x-1 self-end"
                    >
                        <p className="text-sm text-neutral-foreground font-medium">Products:</p>
                        <p className="text-sm text-muted-foreground">{data.orderedProducts.length}</p>
                    </div>
                </div>
            </article>
        </Link>
    )
}
