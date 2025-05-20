import { formatter } from "./formatter";

export function convertToCurrency(price: number, fromCurrency: '₦' | '$', toCurrency: '₦' | '$', shouldFormat = true) {
    // hard code the conversion of dollar to naira and vice versa
    // have a hard coded conversion rate of 1 dollar to 1,548.77 naira
    const dollarToNaira = 1_548.77;
    const nariaToDollar = 0.00065;
    let result = 0;
    // handle custom rate
    if (fromCurrency === '₦' && toCurrency === '$') {
        result = price * nariaToDollar;
    }
    if (fromCurrency === '$' && toCurrency === '₦') {
        result = price * dollarToNaira;
    }
    if (fromCurrency === toCurrency) {
        result = price;
    }
    if (!shouldFormat) return parseInt(`${result}`);
    return formatter(+result.toFixed(0), toCurrency === '₦' ? 'NGN' : 'USD');

}