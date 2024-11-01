import React from 'react';

export function ProductRowSkeleton() {
    return (
        <div className='mb-3 p-4'>
            <div className='bg-gray-300  h-5 w-2/4 max-w-xs mb-2 animate-pulse rounded-md'></div>
            <div className="flex space-x-4 overflow-x-hidden">
                {Array.from({ length: 5 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
}
export function ProductCardSkeleton() {
    return (
        <div
            className="min-w-[220px] max-w-[300px] min-h-64  rounded-lg animate-pulse flex-shrink-0 space-y-4 p-4"
        >
            <div className="h-56 w-full bg-gray-400 rounded-md"></div>
            <div className='flex justify-between items-center'>
                <div className="h-4 w-3/4 bg-gray-400 rounded mr-2"></div>
                <div className="h-6 w-1/4 bg-gray-400 rounded"></div>
            </div>
            <div className="h-4 w-10 bg-gray-400 rounded mt-1"></div>
        </div>
    )
}
