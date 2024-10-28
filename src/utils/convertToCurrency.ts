export function convertToCurrency(price: number,  currency: '₦' | '$', rate: number){
    // handles formatting of commas as well
    return `${currency}${price}`
}