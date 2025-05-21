
'use client'

import { useEffect } from 'react'
import { useCurrencyStore, Currency } from '@/hooks/use-currency'

export default function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const setCurrency = useCurrencyStore(state => state.setCurrency)
    const initialize = useCurrencyStore(state => state.initialize)
    useEffect(() => {
        function getInitialCurrency(): Currency {
            if (typeof document !== 'undefined') {
                const cookieCurrency = document.cookie
                    .split('; ')
                    .find((row) => row.startsWith('x-currency='))
                    ?.split('=')[1];

                if (cookieCurrency === '₦' || cookieCurrency === '$') {
                    return cookieCurrency;
                }

                const country = document.cookie
                    .split('; ')
                    .find((row) => row.startsWith('x-country-code='))
                    ?.split('=')[1];

                if (country === 'NG') return '₦';
            }
            return '$';
        }
        const initialCurrency = getInitialCurrency();
        initialize(true)
        setCurrency(initialCurrency)
    }, [])

    return <>{children}</>
}
