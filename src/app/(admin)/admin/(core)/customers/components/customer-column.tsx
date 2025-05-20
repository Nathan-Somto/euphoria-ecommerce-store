import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import Link from "next/link"
import { cn } from "@/lib/utils"
import CellAction from "./cell-action"
import { CustomersTable } from "."

export const getCustomerColumns: () => ColumnDef<CustomersTable[number]>[] = () => [
    {
        accessorKey: "profilePhoto",
        header: "Photo",
        cell: ({ row }) => {
            const photo = row.original.profilePhoto
            const name = row.original.name
            return photo ? (
                <img
                    src={photo}
                    alt={name}
                    className="w-8 h-8 rounded-full object-cover"
                />
            ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600">
                    {name.charAt(0).toUpperCase()}
                </div>
            )
        },
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const { id, name } = row.original
            return (
                <Link href={`/admin/customers?id=${id}`}>
                    <span className="underline text-blue-600 font-medium text-sm">
                        {name}
                    </span>
                </Link>
            )
        },
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
            <span className="text-sm text-gray-700">{row.original.email}</span>
        ),
    },
    {
        accessorKey: "createdAt",
        header: "Joined",
        cell: ({ row }) => (
            <span className="text-sm text-gray-600">
                {format(new Date(row.original.createdAt), "do MMM, yyyy")}
            </span>
        ),
    },
    {
        accessorKey: "isDisabled",
        header: "Status",
        cell: ({ row }) => {
            const disabled = row.original.isDisabled
            return (
                <span
                    className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-medium",
                        disabled
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                    )}
                >
                    {disabled ? "Banned" : "Active"}
                </span>
            )
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const { id, isDisabled } = row.original
            return <CellAction id={id} isDisabled={isDisabled} />
        },
    },
];
