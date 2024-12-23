'use client'
import { CartItem } from '@/app/(main)/(root)/cart/components'
import { Button } from '@/components/ui/button'
import Loader from '@/components/ui/loader'
import { CART_STORAGE_KEY } from '@/constants'
import { IntentSchema } from '@/schema/intent.schema'
import { errorLogger } from '@/utils/errorLogger'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, type Stripe } from '@stripe/stripe-js'
import { RotateCwIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { PropsWithChildren } from 'react'
type LocalCartState = {
    state: {
        cart: CartItem[]
    }
}
type Props = PropsWithChildren<{
    pk?: string
    userId: string
}>
/**
 *  
 *@param {Object} Props
 * @param {string} Props.pk - stripe publishable key 
 * @param {string} Props.userId - the user id
 * 
 */
export default function StripeProvider({ children, pk, userId }: Props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(true);
    const [stripe, setStripe] = React.useState<Stripe | null>(null)
    const [clientSecret, setClientSecret] = React.useState<string | null>(null)
    const [error, setError] = React.useState(false)
    const hasRun = React.useRef(false)
    React.useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;
        const createPaymentIntent = async () => {
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
                const reqBody: IntentSchema = {
                    items: itemsInCart
                        .map(item =>
                        ({
                            price: item.price,
                            quantity: item.quantity,
                            productId: item.id,
                            discountRate: item.discountRate,
                            color: item.color,
                            size: item.size
                        })),
                    currency: 'usd',
                    userId
                }
                const body = JSON.stringify(reqBody)
                const postRes = await fetch('/api/stripe', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body
                })
                const data = await postRes.json()
                if (!postRes.ok) {
                    throw new Error(`${data.message}`)
                }
                setClientSecret(data.client_secret)
                setStripe(stripeRes)
            } catch (err) {
                errorLogger(err)
                setError(true);
            } finally {
                setIsLoading(false)
            }
        }
        createPaymentIntent()
    }, []);
    if (isLoading || error) {
        return <div className='h-screen w-full bg-background grid place-items-center'>
            {error ?
                <div>
                    <h3 className='mb-4 text-5xl '>ERROR!</h3>
                    <p
                        className='text-center mb-2 text-neutral-400'>
                        An Error just occured while loading the checkout page
                    </p>
                    <Button
                        className='gap-x-2'
                        onClick={() =>
                            router.refresh()
                        }>
                        <RotateCwIcon className='size-4' />
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
