import { getAllCustomersForAdmin } from "@/actions/user.actions";

export type CustomersData = ServerActionReturnType<typeof getAllCustomersForAdmin>
export type CustomersTable = CustomersData['customers'];

export type CustomersClientProps = {
    data: CustomersData
}