'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { ProductResponse } from '.'
import ProductCard from './product-card'
type ProductGridProps = {
  products: ProductResponse,
  emptyText?: string
  emptyTextRender?: (len: number) => React.ReactNode
}
function ProductList({ products, emptyText, emptyTextRender }: ProductGridProps) {
  return (
    <>
      {products.length > 0 ? (
        products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ amount: 'some', once: true }}
            transition={{
              duration: 0.65,
              delay: 0.75 + (index * 0.09)
            }}
          >
            <ProductCard
              category={product.category}
              id={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              createdAt={product.createdAt}
              discountRate={product.discountRate}
              colors={product.colors}
              sizes={product.size}
              wishListProductIds={[]}
              unitsInStock={product.units}
            />
          </motion.div>
        ))
      ) : (
        <p className="text-center text-gray-500  w-full col-span-4">
          {
            emptyText
          }
          {
            emptyTextRender && emptyTextRender(products.length)
          }
        </p>
      )}
    </>
  )
}

export default ProductList