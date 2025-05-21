import { getAdminOrders } from "@/actions/orders.actions";

export type OrdersData = ServerActionReturnType<typeof getAdminOrders>
export type OrdersTable = OrdersData['orders'];
export type OrdersProducts = OrdersTable[number]['products']
export type GetOrdersColumnsParams =
    {
        page: number;
        getOrderNumber: (page: number, index: number) => number;
        getTotalPrice: (products: OrdersProducts) => number;
    }
export type OrdersClientProps = {
    data: OrdersData
}