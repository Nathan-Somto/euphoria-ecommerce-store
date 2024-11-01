import { getMainSiteProducts } from "@/actions/products.actions";
import FilterBox from "./components/products-filter/filter-box";
import ProductsGrid from "./components/products-grid";
import {
    unstable_cache as cache
} from 'next/cache';
// the revalidation is done by the admin panel
const getProducts = cache(async () => await getMainSiteProducts(), ['products'], {
    revalidate: false,
    tags: ['products']
});
export default async function CategoryPage() {
    // recieves the category to filter ?category:=category
    // fiters by color ?color:=color
    // filters by price ?price:=price
    // filters by size ?size:=size
    // filters by new or best seller ?type:= new | bestseller
    // fetches all the products from the server
    const { data: products } = await getProducts();
    return (
        <>
            <div className="grid h-full max-w-[1110px] mx-auto lg:grid-cols-[295px_1fr] py-4">
                <div className="h-[calc(100vh-(20*0.25rem))] hidden lg:block overflow-y-auto  top-[calc(20*0.25rem)] sticky left-0 z-[3] ">
                    <FilterBox />
                </div>
                <ProductsGrid products={products ?? []} />
            </div>
        </>
    )
}