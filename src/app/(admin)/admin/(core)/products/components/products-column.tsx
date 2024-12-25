import { ColumnDef } from "@tanstack/react-table";
import { GetProductsColumnsParams, ProductTable } from ".";
import { format } from "date-fns";
import CellAction from "./cell-action";
export function getProductsColumns({
   editProductRedirect,
    toggleDeleteDialog,
  }: GetProductsColumnsParams): ColumnDef<ProductTable>[] {
    return [
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => {
                return (
                    <span className="capitalize font-medium tracking-wide">
                        {row.original.name}
                    </span>
                );
            },
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: ({ row }) => {
                return (
                    <span className="opacity-80 ">
                        {row.original.price}
                    </span>
                );
            },
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: ({ row }) => {
                return <span className="">{row.original.category}</span>;
            },
        },
        {
            accessorKey: "colors",
            header: "Colors",
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        {row.original.colors.slice(3).map((color, index) => (
                            <div
                                key={index}
                                className="h-4 w-4 rounded-full"
                                style={{ backgroundColor: color }}
                            ></div>
                        ))}
                    </div>
                );
            },
        },
        {
            accessorKey: "units",
            header: "Units",
            cell: ({ row }) => {
                return <span className="">{row.original.units}</span>;
        } },
        {
            accessorKey: "isFeatured",
            header: "Featured",
            cell: ({ row }) => {
                return (
                    <span className="capitalize">
                        {row.original.isFeatured ? "Yes" : "No"}
                    </span>
                );
            },
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ row }) => {
                return (
                    <span className="opacity-80 ">
                        {format(row.original.createdAt, "do, MMMM, yyyy")}
                    </span>
                );
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                return (
                     <CellAction
                        id={row.original.id}
                        name={row.original.name}
                        editProductRedirect={editProductRedirect}
                        toggleDeleteDialog={toggleDeleteDialog}
                    /> 
                );
            },
        }
    ];
}