'use client';
import { DataTable } from '@/components/ui/data-table'
import React from 'react'
import { getCustomerColumns } from './customer-column'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Pagination from '@/components/pagination'
import SearchBar from '@/components/search-bar'
import { CustomersClientProps, CustomersTable } from '.'


export default function CustomersClient(
    { data: {
        customers,
        totalPages,
    } }: CustomersClientProps
) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [filterValue, setFilterValue] = React.useState("");
    const createQueryString = React.useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return '?' + params.toString()
        },
        [searchParams]
    )
    const [filteredData, setFilteredData] = React.useState<CustomersTable | null>(null);
    const page = searchParams.get('page') !== null ? +(searchParams.get('page') as string) : 1
    const handleSearchFilter = (value: string) => {
        setFilterValue(value);
        // filter the data
        if (value) {
            const filtered = customers.filter((customer) =>
                customer.name.toLowerCase().includes(value.toLowerCase())
            )
            setFilteredData(filtered)
        } else {
            setFilteredData(null)
        }
    };
    const handleNext = () => {
        router.push(pathname + createQueryString('page', (page + 1).toString()))
    }
    const handlePrevious = () => {
        router.push(pathname + createQueryString('page', (page - 1).toString()))
    }
    const customerData = filteredData ?? customers
    return (
        <div className='space-y-6'>
            <div className="md:flex space-y-3 md:space-y-0 items-center justify-between">
                <SearchBar
                    onChange={handleSearchFilter}
                    placeholder="Search for a customer"
                    value={filterValue}
                    useDebounce={false}
                />
            </div>
            <DataTable
                name="customers"
                columns={getCustomerColumns()}
                data={customerData}
            />
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onNext={handleNext}
                onPrevious={handlePrevious}
            />
        </div>
    )
}
