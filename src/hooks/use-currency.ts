import { create } from 'zustand'
export type Currency = '$' | '₦'
interface CurrencyState {
    currency: '$' | '₦'
    setCurrency: (currency: '$' | '₦') => void,
    initialize: (val: boolean) => void
    initialized: boolean
}

export const useCurrencyStore = create<CurrencyState>((set) => ({
    initialized: false,
    currency: '$',
    setCurrency: (currency) => {
        set({ currency });
        document.cookie = `x-currency=${currency}; path=/; max-age=${60 * 60 * 24 * 30}`;
    },
    initialize: (val) => set({ initialized: val })
}))
