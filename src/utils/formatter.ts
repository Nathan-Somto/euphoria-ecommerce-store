export const formatter = (content: number, currency: 'USD' | 'NGN') => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency,
  currencyDisplay: 'narrowSymbol',
}).format(content);