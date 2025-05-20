import { ColumnDef } from "@tanstack/react-table";
import { GetOrdersColumnsParams, OrdersTable } from ".";
import { format } from "date-fns";
import CellAction from "./cell-action";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { convertToCurrency } from "@/utils/convertToCurrency";
import { DEFAULT_CURRENCY } from "@/constants";
export function getOrdersColumns({
  getTotalPrice,
  getOrderNumber,
  page,
}: GetOrdersColumnsParams): ColumnDef<OrdersTable[number]>[] {
  return [
    {
      header: "Order",
      id: "order",
      cell: ({ row }) => {
        return (
          <span className="capitalize font-medium tracking-wide text-gray-500">
            {`#${getOrderNumber(page, row.index)}`}
          </span>
        );
      },
    },
    {
      accessorKey: "product",
      header: "Products",
      cell: ({ row }) => {
        return (
          <span className="truncate">
            {row.original.products.map((product) => product.name).join(", ")}
          </span>
        );
      },
    },
    {
      accessorKey: "user",
      header: "Customer",
      cell: ({ row }) => {
        const { id, name } = row.original.user;
        return <Link href={`/admin/customers?id=${id}`}><span className="underline text-blue-600">{name}</span></Link>;
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => {
        return (
          <span className="opacity-80 ">
            {format(row.original.createdAt, "do, MMMM, yyyy")}
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status.toLowerCase();
        return (
          <span
            className={cn(
              "capitalize rounded-sm px-1 text-black/70 text-xs",
              status === "pending" && "bg-yellow-500",
              status === "delivered" && "bg-green-500",
              status === "failed" && "bg-red-500",
              status === "paid" && "bg-blue-500",
            )}
          >
            {row.original.status.toLowerCase()}
          </span>
        );
      },
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => {
        const total = getTotalPrice(row.original.products);
        return <span className="">{`${convertToCurrency(total, DEFAULT_CURRENCY, '₦')}`}</span>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <CellAction
            id={row.original.id}
            currentStatus={row.original.status}
            products={row.original.products}
          />
        );
      },
    },
  ];
}
