"use client";
import Pagination from "@/components/pagination";
import SearchBar from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import React from "react";
import { OrdersClientProps, OrdersProducts, OrdersTable } from ".";
import { DataTable } from "@/components/ui/data-table";
import { getOrdersColumns } from "./orders-column";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const tabList = [
  { label: "All", value: "all" },
  { label: "Paid", value: "paid" },
  { label: "Pending", value: "pending" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

export default function OrdersClient({ data: {
  orders,
  totalPages
} }: OrdersClientProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [filterValue, setFilterValue] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("all");
  const page = searchParams.get('page') !== null ? +(searchParams.get('page') as string) : 1
  const handleSearchFilter = (value: string) => {
    setFilterValue(value);
  };
  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return '?' + params.toString()
    },
    [searchParams]
  )
  const downloadAsCSV = () => {

  };
  const handleNext = () => {
    router.push(pathname + createQueryString('page', (page + 1).toString()))
  }
  const handlePrevious = () => {
    router.push(pathname + createQueryString('page', (page - 1).toString()))
  }
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  const getOrderNumber = (page: number, index: number) => {
    return page * (index + 1);
  }
  const getTotalPrice = (products: OrdersProducts) => {
    return products.reduce((acc, next) =>
      acc + ((next?.price ?? 1) * next.quantity)
      , 0)
  }
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <SearchBar
          onChange={handleSearchFilter}
          placeholder="Search for an order"
          value={filterValue}
        />
        <Button variant="outline" onClick={downloadAsCSV}>
          <DownloadIcon className="mr-2" /> Download As CSV
        </Button>
      </div>

      {/* Tab List */}
      <div className="bg-white shadow-md rounded-sm  h-12 ">
        <div className="flex justify-between items-end">
          {tabList.map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleTabChange(tab.value)}
              className={`py-2.5 w-full px-4  h-12 text-sm font-semibold transition-colors ${activeTab === tab.value
                ? "border-b-2 border-b-primary text-primary"
                : "text-gray-600 hover:text-primary hover:bg-primary/10"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {/* Table */}
      <DataTable
        name="Orders"
        columns={getOrdersColumns({
          getOrderNumber,
          getTotalPrice,
          page: 1
        })}
        data={orders}
      />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
}
