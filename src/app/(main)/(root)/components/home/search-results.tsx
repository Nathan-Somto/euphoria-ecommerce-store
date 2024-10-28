'use client';
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import ProductCard from '../product/product-card';
import { ProductResponse } from '../product';

type SearchResultsScreenProps = {
    products: ProductResponse;
};

export default function SearchResultsScreen({ products }: SearchResultsScreenProps) {
    const searchParams = useSearchParams();
    const query = searchParams.get('search') ?? '';
    const [filteredProducts, setFilteredProducts] = useState<ProductResponse>([]);
    useEffect(() => {
        setFilteredProducts(
            products.filter((product) =>
                product.name.toLowerCase().includes(query.toLowerCase())
            )
        );
        if (query !== '') {
            document.querySelector('body')?.classList.add('overflow-hidden')
        }
        else {
            document.querySelector('body')?.classList.remove('overflow-hidden')
        }
    }, [query]);

    const [containerHeight, setContainerHeight] = useState<number | null>(null);

    useEffect(() => {
        const calculateHeight = () => {
            // get the height of the screen
            const screenHeight = screen.height;
            console.log("screenHeight", screenHeight);
            const height = screenHeight - (20 * 4);
            if (height) {
                setContainerHeight(height);
            }
        }

        calculateHeight();
        window.addEventListener('resize', calculateHeight);

        return () => window.removeEventListener('resize', calculateHeight);
    }, []);
    console.log("container height:", containerHeight)
    return (
        <AnimatePresence>
            {query !== '' && containerHeight !== null ?
                <motion.div
                    key="search"
                    initial={{
                        opacity: 0,
                        maxHeight: 0
                    }}
                    animate={{
                        opacity: 1,
                        maxHeight: `${containerHeight}px`,
                        transition: {
                            duration: 0.75,
                            ease: [0.31, 0.34, 0.12, 0.9]
                        }
                    }}
                    exit={{
                        opacity: 0,
                        height: 0,
                        transition: {
                            duration: 0.75,
                            delay: 0.3,
                            ease: [0.31, 0.34, 0.12, 0.9]
                        }
                    }}
                    style={{
                        maxHeight: `${containerHeight}px`
                    }}
                    className=" fixed top-[calc(20*0.25rem)]  pt-5 w-full bg-white  inset-0  z-[60] overflow-y-auto flex justify-center px-6"
                >
                    <div className="max-w-screen-lg w-full mx-auto mb-10">
                        <h2 className="text-2xl font-semibold mb-6 text-center">
                            Search Results for "{query}"({filteredProducts.length})
                        </h2>
                        <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product, index) => (
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
                                            wishListProductIds={[]}
                                        />
                                    </motion.div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">
                                    No results found for <span className="font-semibold">"{query}"</span>
                                </p>
                            )}
                        </div>
                    </div>
                </motion.div>
                : null}
        </AnimatePresence>
    );
}
