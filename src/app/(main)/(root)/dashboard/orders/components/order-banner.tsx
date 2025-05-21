import { DEFAULT_CURRENCY } from '@/constants'
import { useCurrencyStore } from '@/hooks/use-currency'
import { convertToCurrency } from '@/utils/convertToCurrency'
import { formatDate } from 'date-fns'
import React from 'react'
interface Props {
    orderNumber: number
    createdAt: string | Date
    totalPrice: number
    address: string
}
export default function OrderBanner({ orderNumber, createdAt, totalPrice, address }: Props) {
    const currency = useCurrencyStore(state => state.currency);
    return (
        <div>
            <article className="flex  justify-between p-4 bg-neutral shadow-sm rounded-lg my-5">
                <div className=''>
                    <h3 className="text-lg font-semibold mb-3">Order no: #{orderNumber}</h3>
                    <p
                        className="text-sm text-neutral-foreground mb-1">
                        Placed on {formatDate(createdAt, 'd MMMM yyy h:m')}
                    </p>
                    <p className="text-sm text-neutral-foreground">
                        {address}
                    </p>
                </div>
                <p className='text-lg text-neutral-foreground self-center'>
                    Total: <span className='text-primary-foreground'>
                        {
                            convertToCurrency(totalPrice, DEFAULT_CURRENCY, currency)
                        }
                    </span>
                </p>
            </article>
        </div>
    )
}
