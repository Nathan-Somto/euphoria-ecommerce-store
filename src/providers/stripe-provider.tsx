'use client'
import { CartItem } from '@/app/(main)/(root)/cart/components'
import { Button } from '@/components/ui/button'
import Loader from '@/components/ui/loader'
import { CART_STORAGE_KEY } from '@/constants/keys'
import { errorLogger } from '@/utils/errorLogger'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, type Stripe } from '@stripe/stripe-js'
import { RotateCwIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { PropsWithChildren } from 'react'
type LocalCartState = {
    state: {
        cart: CartItem[]
    }
}
type Props = PropsWithChildren<{
    pk?: string
}>
/**
 *  
 * @param pk - stripe public key
 * 
 */
export default function StripeProvider({ children, pk }: Props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(true);
    const [stripe, setStripe] = React.useState<Stripe | null>(null)
    const [clientSecret, setClientSecret] = React.useState<string | null>(null)
    const [error, setError] = React.useState(false)
    React.useEffect(() => {
        (async () => {
            if (!isLoading) return;
            try {
                // local storage is used to retrieve the cart items because:
                // for some reason the store is not available when the stripe provider is mounted
                let cartInStorage: string | LocalCartState | null = localStorage.getItem(CART_STORAGE_KEY)
                if (!cartInStorage) {
                    router.push('/cart');
                    return;
                }
                cartInStorage = JSON.parse(cartInStorage);
                const itemsInCart = (cartInStorage as LocalCartState)?.state?.cart;
                if (itemsInCart.length === 0) {
                    router.push('/cart');
                    return;
                }
                const stripeRes = await loadStripe(pk ?? '')
                if (!stripeRes) {
                    throw new Error('Failed to load stripe');
                }
                const body = JSON.stringify({
                    items: itemsInCart
                        .map(item =>
                        ({
                            price: item.price,
                            quantity: item.quantity
                        })),
                    currency: 'usd'
                })
                const postRes = await fetch('/api/stripe', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body
                })
                const data = await postRes.json()
                if (!postRes.ok) {
                    throw new Error(`${data}`)
                }
                setClientSecret(data.client_secret)
                setStripe(stripeRes)
            } catch (err) {
                errorLogger(err)
                setError(true);
            } finally {
                setIsLoading(false)
            }
        })()
    }, []);
    if (isLoading || error) {
        return <div className='h-screen w-full bg-background grid place-items-center'>
            {error ?
                <div>
                    <p
                        className='text-center mb-2 text-neutral-400'>
                        An Error just occured while loading the checkout page
                    </p>
                    <Button
                        onClick={() =>
                            router.refresh()
                        }>
                        <RotateCwIcon />
                        Retry
                    </Button>
                </div> : <Loader />
            }
        </div>
    }
    return (
        <>
            {(clientSecret && stripe) && (
                <Elements
                    stripe={stripe}
                    options={{
                        clientSecret: clientSecret ?? '',
                        loader: 'auto',
                        appearance: {
                            theme: 'stripe',
                            disableAnimations: false
                        }
                    }}
                >
                    {children}
                </Elements>
            )}
        </>
    )
}
