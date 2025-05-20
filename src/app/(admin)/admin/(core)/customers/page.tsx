import { Heading } from '@/components/ui/heading'
import React from 'react'
import CustomersClient from './components/customers-client'
import { getAllCustomersForAdmin } from '@/actions/user.actions'
export default async function CustomersPage(
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
    const { data } = await getAllCustomersForAdmin(page);
    //console.log("customers data:", JSON.stringify(data, null, 2));
    return (
        <div>
            <div className="flex items-center justify-between mb-8 mt-16">
                <Heading
                    title="Customers Page"
                    description="check all the customers who registered on the platform"
                />
            </div>
            <CustomersClient data={{
                customers: data?.customers ?? [],
                page: data?.page ?? 1,
                totalPages: data?.totalPages ?? 1
            }} />
        </div>
    )
}