import React from 'react'
import ProductList from '../../components/product/product-list'
import { getSimilarProducts } from '@/actions/products.actions'

type Props = {
    id: string
}
export async function SimilarProducts({ id }: Props) {
    const { data: similarProducts } = await getSimilarProducts(id)

    return (

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            <ProductList
                products={similarProducts ?? []}
                emptyText='No Similar Product'
            />
        </div>

    )
}

export default SimilarProducts