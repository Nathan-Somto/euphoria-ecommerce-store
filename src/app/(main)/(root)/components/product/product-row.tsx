'use client';
import React from "react"
import { ProductResponse } from "."
import { daysDifference } from "@/utils/daysDifference"
import SectionHeading from "../section-heading"
import RowSlider from "@/components/carousel/row-slider"
import ProductCard from "./product-card"
import { ProductRowSkeleton } from "./product-row-skeleton";

type ProductRowProps = {
    data: ProductResponse
    headingFilter: string | 'New Arrivals'
}
export function ProductRow({ data, headingFilter }: ProductRowProps) {
    const [products, setProducts] = React.useState<ProductResponse>(data)
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (headingFilter === 'New Arrivals') {
                setProducts(data.filter(product => daysDifference(new Date(product.createdAt), new Date()) <= 30))
            }
            else {
                setProducts(data.filter(product => product.category === headingFilter))
            }
            setLoading(false)
        }, 1500);
        return () => clearTimeout(timeoutId)
    }, [data]);
    return (
        <div className="lg:my-24 my-16 max-w-screen-lg w-[90%] mx-auto lg:space-y-14 space-y-10">
            <SectionHeading
                title={headingFilter}
            />
            <div>
                {
                    loading ? <ProductRowSkeleton /> :
                        products.length === 0 ?
                            <p className="text-gray-500 font-medium text-center my-8">No products for {headingFilter}</p> :
                            <RowSlider
                                Comp={ProductCard}
                                items={products.map(product => ({
                                    id: product.id,
                                    name: product.name,
                                    image: product.image,
                                    price: product.price,
                                    wishListProductIds: [],
                                    discountRate: product.discountRate,
                                    createdAt: product.createdAt,
                                    category: product.category

                                }))}
                                gapX={25}
                            />
                }
            </div>
        </div>
    )
}