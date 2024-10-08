import { getAdminProducts, getProduct } from "@/actions/products.actions";

export type ProductTable = ServerActionReturnType<typeof getAdminProducts>[number];
export type ProductsClientProps = {
  adminProducts: ProductTable[];
};

type ProductData = ServerActionReturnType<typeof getProduct>;
export type ProductClientProps = {
  isCreate: boolean;
  initialData?: ProductData;
  categoryData: { id: string; name: string }[];
}
export type GetProductsColumnsParams = {
  editProductRedirect: (id: string) => void;
  toggleDeleteDialog: ({ id: string, name: string, open: boolean }) => void;
};
