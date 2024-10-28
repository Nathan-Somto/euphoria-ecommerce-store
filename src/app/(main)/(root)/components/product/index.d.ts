import { getMainSiteProducts } from "@/actions/products.actions";

export type ProductResponse = ServerActionReturnType<typeof getMainSiteProducts>