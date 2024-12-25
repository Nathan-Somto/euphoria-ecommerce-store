import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductsClient from "./components/products-client";
import { getAdminProducts } from "@/actions/products.actions";
export default async function ProductsPage() {
  const { data } = await getAdminProducts();
  return (
    <div>
      <div className="flex items-center justify-between mb-8 mt-10">
        <Heading
          title="Products Page"
          description="explore the list of all available products"
        />
        <Button asChild>
          <Link href="/admin/products/new">Add a Product</Link>
        </Button>
      </div>
      <ProductsClient adminProducts={data ?? []} />
    </div>
  );
}
