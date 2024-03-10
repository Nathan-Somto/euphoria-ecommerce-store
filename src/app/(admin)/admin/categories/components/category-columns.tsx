import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-actions";
import { format } from "date-fns";
import { GetCategoryColumnsParams, CategoryTable } from ".";

function getCategoyColumns({
  setOpenEditDialog,
  setOpenDeleteDialog,
  setCurrentCategory,
}: GetCategoryColumnsParams): ColumnDef<CategoryTable>[] {
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
      accessorKey: "products",
      header: "Products",
      cell: ({ row }) => {
        return <span className="">{row.original.products.length}</span>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <CellAction
            id={row.original.id}
            name={row.original.name}
            createdAt={row.original.createdAt}
            products={row.original.products}
            setOpenEditDialog={setOpenEditDialog}
            setOpenDeleteDialog={setOpenDeleteDialog}
            setCurrentCategory={setCurrentCategory}
          />
        );
      },
    },
  ];
}
export { getCategoyColumns };
