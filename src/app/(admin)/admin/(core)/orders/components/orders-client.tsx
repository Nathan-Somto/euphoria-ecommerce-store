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
import { calculateTotal } from "@/utils/calculateTotal";
import { $Enums } from "@prisma/client";
import { getOrderListData, getOrderTriggers, OrderTriggers } from "@/utils/ordersFilter";

type Status = $Enums.Status;
export default function OrdersClient({ data: {
  orders,
  totalPages,
} }: OrdersClientProps) {
  const [isDownloading, setIsDownloading] = React.useState(false);
  const downloadRef = React.useRef<HTMLAnchorElement>(null);
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [filterValue, setFilterValue] = React.useState("");
  const [activeTab, setActiveTab] = React.useState<OrderTriggers['value']>("ALL");
  const [filteredData, setFilteredData] = React.useState<OrdersTable>([]);
  const page = searchParams.get('page') !== null ? +(searchParams.get('page') as string) : 1
  const handleSearchFilter = (value: string) => {
    setFilterValue(value);
  };
  React.useEffect(() => { }, [])
  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return '?' + params.toString()
    },
    [searchParams]
  )
  const downloadAsCSV = () => {
    if (!downloadRef.current) return
    setIsDownloading(true);
    // handle downloadAsCSV
    const csv = orders.map((order) => {
      return order.products.map((product) => {
        return [
          order.id,
          order.user.name,
          product.name,
          product.quantity,
          product.price,
          product.discountRate,
          order.status,
          order.createdAt,
        ].join(",");
      });
    });
    const csvData = csv.join("\n");
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    downloadRef.current.href = url;
    downloadRef.current.download = `orders-${new Date().toISOString()}.csv`;
    downloadRef.current.click();
    setIsDownloading(false);

  };
  const handleNext = () => {
    router.push(pathname + createQueryString('page', (page + 1).toString()))
  }
  const handlePrevious = () => {
    router.push(pathname + createQueryString('page', (page - 1).toString()))
  }
  const handleTabChange = (value: OrderTriggers['value']) => {
    setActiveTab(value);
    const data = getOrderListData(orders, value);
    setFilteredData(data as unknown as OrdersTable);
  };
  const getOrderNumber = (page: number, index: number) => {
    return page * (index + 1);
  }
  const tabList = getOrderTriggers();
  const getTotalPrice = (products: OrdersProducts) => calculateTotal(products).actualTotal
  const getOrders = () => activeTab === 'ALL' ? orders : filteredData
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="md:flex space-y-3 md:space-y-0 items-center justify-between">
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
          page
        })}
        data={getOrders()}
      />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
      <a ref={downloadRef} className="hidden size-0" />
    </div>
  );
}
