import { getCategories } from "@/actions/categories.actions";
import ProductClient from "../components/product-client";
import { getProduct } from "@/actions/products.actions";
type ProductPageProps = {
  params: {
    productId: string;
  };
};
export default async function ProductPage({
  params: { productId },
}: ProductPageProps) {
  let initialData;
  const { data: categoryData } = await getCategories(false);
  const isCreate = productId === "new";
  if (!isCreate && typeof productId === "string") {
    const { data } = await getProduct(productId, true);
    initialData = data;
  }
  return (
    <div>
      <ProductClient
        isCreate={isCreate}
        initialData={initialData}
        categoryData={categoryData}
      />
    </div>
  );
}
