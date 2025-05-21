import { $Enums } from "@prisma/client";

export interface OrderTriggers {
    label: Capitalize<string>
    value: $Enums.Status | 'ALL'
}
export const getOrderTriggers = (dontInclude?: ($Enums.Status | 'ALL')[]): OrderTriggers[] => {
    const OrderTriggers: OrderTriggers[] = [
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
        },
        {
            label: 'Pending',
            value: 'PENDING'
        }
    ]
    if (dontInclude) {
        return OrderTriggers.filter(trigger => !dontInclude.includes(trigger.value))
    }
    return OrderTriggers;
}
interface OrderData extends Record<string, any> {
    status: $Enums.Status
}
export const getOrderListData = (data: OrderData[], status: OrderTriggers['value']) => {
    if (status === 'ALL') return data;
    return data.filter((order: OrderData) => order.status === status)
}