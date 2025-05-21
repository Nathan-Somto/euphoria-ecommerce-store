"use client";
import SearchBar from "@/components/search-bar";
import { DataTable } from "@/components/ui/data-table";
import { get } from "http";
import { Delete, Grid3X3Icon, Table2Icon } from "lucide-react";
import React from "react";
import { getProductsColumns } from "./products-column";
import { useRouter } from "next/navigation";
import DeleteDialog from "@/components/delete-dialog";
import { deleteProduct } from "@/actions/products.actions";
import ProductCard from "./product-card";
import { ProductsClientProps, ProductTable } from ".";

function ProductsClient({ adminProducts }: ProductsClientProps) {
  const [products, setProducts] = React.useState<ProductTable[]>([]);
  const [filterValue, setFilterValue] = React.useState("");
  const [view, setView] = React.useState<"card" | "table">("table");
  const [currentProduct, setCurrentProduct] = React.useState({
    id: "",
    name: "",
  });
  React.useEffect(() => {
    setProducts(adminProducts);
  }, [adminProducts]);
  const [deleteDialog, setDeleteDialog] = React.useState(false);
  const router = useRouter();
  const editProductRedirect = (id: string) => {
    router.push(`/admin/products/${id}`);
  };
  const toggleDeleteDialog = ({
    id,
    name,
    open,
  }: {
    id: string;
    name: string;
    open: boolean;
  }) => {
    setCurrentProduct({ id, name });
    setDeleteDialog(open);
  };
  const handleFilter = (value: string) => {
    setFilterValue(value);
    if (value) {
      setProducts(
        adminProducts.filter((product) =>
          product.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setProducts(adminProducts);
    }
  };
  return (
    <div>
      <div className="flex  w-full  justify-between ">
        {/* Search Bar */}
        <div className="flex-[0.7]">
          <SearchBar
            onChange={handleFilter}
            value={filterValue}
            useDebounce={false}
          />
        </div>
        {/* Button to switch from table view to card view */}
        <div className="inline-flex h-10  items-center justify-center rounded-md bg-gray-200 p-1 text-muted-foreground px-3 border border-gray-500  max-h-fit">
          <button
            onClick={() => setView("table")}
            data-state={view !== "card" ? "active" : ""}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-gray-400 data-[state=active]:text-black/70 data-[state=active]:shadow-sm"
          >
            <Table2Icon className="h-5 w-5" />
            <span className="sr-only">Table View</span>
          </button>
          <button
            onClick={() => setView("card")}
            data-state={view === "card" ? "active" : ""}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-gray-400 data-[state=active]:text-black/70 data-[state=active]:shadow-sm"
          >
            <Grid3X3Icon className="h-5 w-5" />
            <span className="sr-only">Card View</span>
          </button>
        </div>
      </div>
      <div className="mt-6">
        {/* Table view */}
        {view === "table" && (
          <DataTable
            name="Products"
            columns={getProductsColumns({
              editProductRedirect,
              toggleDeleteDialog,
            })}
            data={products}
          />
        )}
        {/* Card view */}
        {view === "card" && (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.name}
                id={product.id}
                category={product.category}
                description={product.description}
                images={product.images}
                name={product.name}
                price={product.price}
                size={product.size}
                isArchived={product.isArchived}
                units={product?.units ?? 1}
                toggleDeleteDialog={toggleDeleteDialog}
              />
            ))}
          </div>
        )}
      </div>
      <DeleteDialog
        actionFn={deleteProduct}
        id={currentProduct.id}
        open={deleteDialog}
        resourceName={currentProduct.name}
        setOpen={setDeleteDialog}
      />
    </div>
  );
}

export default ProductsClient;
