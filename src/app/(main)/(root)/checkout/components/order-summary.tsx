import { DEFAULT_CURRENCY } from '@/constants';
import useCart from '@/hooks/use-cart';
import { useCurrencyStore } from '@/hooks/use-currency';
import { convertToCurrency } from '@/utils/convertToCurrency';
import { pluralize } from '@/utils/pluralize';
import Image from 'next/image';
import React from 'react';

export default function OrderSummary() {
    const cart = useCart((state) => state.cart);
    const currency = useCurrencyStore((state) => state.currency);
    return (
        <div className="w-full  lg:h-[250px] lg:overflow-y-auto">
            {/* Header */}
            <div className="border-b border-neutral-300 px-4 py-3">
                <h2 className="text-lg font-medium">Order Summary</h2>
            </div>

            {/* Cart Items */}
            <div className="px-4 py-3 space-y-4">
                {cart.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-4 border-b border-neutral-300 pb-4 last:border-none"
                    >
                        <Image
                            src={item.imageUrl}
                            alt={`${item.name} image`}
                            width={80}
                            height={80}
                            className="rounded-md object-cover object-top size-20"
                        />
                        <div className="flex-1">
                            <h4 className="text-sm font-medium">
                                {item.name}{' '}
                                <span className="opacity-80 text-xs">x{item.quantity}</span>
                            </h4>
                            <p className="text-sm mt-1 flex items-center gap-2">
                                <span className="opacity-80">Color:</span>
                                <span
                                    className="w-4 h-4 inline-block rounded-full border"
                                    style={{ backgroundColor: item.color }}
                                />
                            </p>
                        </div>
                        <p className="text-base font-medium text-right opacity-80">
                            {convertToCurrency(Math.ceil(item.quantity * item.price), DEFAULT_CURRENCY, currency)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
