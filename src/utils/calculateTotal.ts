import { SHIPPING_RATE } from "@/constants";
import { clamp } from "./clamp";
// type TotalLike a record that must contain discountRate, price and quantity
type TotalLike<T extends Record<string, any>> = T & {
    discountRate: number | null;
    price: number;
    quantity: number;
}[]
// 
type ResultTotal = {
    originalTotal: number;
    actualTotal: number;
    totalDiscountRate: number;
    discountedTotal: number;
    shippingCost: number;
}
export function calculateTotal<T extends Record<string, any>>(items: TotalLike<T>): ResultTotal {

    // Calculate just the original price and total discount rate
    const { originalTotal, totalDiscountRate } = items.reduce((acc, item) => {
        const price = item.price * item.quantity;
        // keeps the discount true to 0<=discount<=100
        const discount = clamp(0, (item?.discountRate ?? 0), 100);
        return {
            originalTotal: acc.originalTotal + price,
            totalDiscountRate: acc.totalDiscountRate + discount,
        };
    }, { originalTotal: 0, totalDiscountRate: 0 });

    // Apply the discount and shipping rates
    const discountedTotal = Math.ceil(originalTotal * (1 - (totalDiscountRate / 100)));
    const actualTotal = Math.ceil(discountedTotal * SHIPPING_RATE);
    const shippingCost = Math.ceil(actualTotal - discountedTotal);

    return {
        originalTotal: Math.ceil(originalTotal),
        totalDiscountRate: Math.ceil(totalDiscountRate),
        actualTotal,
        shippingCost,
        discountedTotal: Math.ceil(discountedTotal)
    };
}