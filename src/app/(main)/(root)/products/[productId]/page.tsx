import { Suspense } from "react";
import ProductInfoClient from "../components/product-info-client";
import { ProductCardSkeleton } from "../../components/product/product-row-skeleton";
import SimilarProducts from "../components/similar-products";
import SectionHeading from "../../components/section-heading";
import { getProduct } from "@/actions/products.actions";
import { redirect, RedirectType } from "next/navigation";
export default async function ProductPage({ params: { productId: id } }: { params: { productId: string } }) {
    const { data, message } = await getProduct(id);
    console.log("the message: ", message !== undefined);
    if (!data || message !== undefined) {
        console.log("not found");
        // intentional go to a not found page
        redirect('/404', RedirectType.replace);
    };
    return (
        <div>
            <ProductInfoClient
                data={
                    data
                }
            />
            <div className="my-6">
                {/* Similar Products */}
                <section className='px-12 max-w-screen-xl mx-auto'>
                    <SectionHeading title='Similar Products' />
                    <div className="my-3"></div>
                    <Suspense fallback={
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <ProductCardSkeleton key={i} />
                            ))}
                        </div>
                    }>
                        <SimilarProducts id={id} />
                    </Suspense>
                </section>
            </div>
        </div>
    )
}