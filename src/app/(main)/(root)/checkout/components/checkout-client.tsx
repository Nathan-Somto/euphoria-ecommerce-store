'use client';
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { useSession } from "next-auth/react";
import React from 'react'
import DeliveryAddress from "./delivery-address";
import { Button } from "@/components/ui/button";
import OrderSummary from "./order-summary";
import { DollarSignIcon } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import useCart from "@/hooks/use-cart";
import { pluralize } from "@/utils/pluralize";
import { errorLogger } from "@/utils/errorLogger";
import toast from "react-hot-toast";
import { PaymentIntentConfirmParams } from "@stripe/stripe-js";
import StripePaymentForm from "./stripe-payment-form";
type Props = {
    addresses: Address[]
}
export default function CheckoutClient({ addresses }: Props) {
    const stripe = useStripe();
    const elements = useElements();
    const session = useSession();
    const cart = useCart(state => state.cart);
    const { isMobile } = useMediaQuery({
        mobileBreakpoint: 1023
    });
    const [isPending, setIsPending] = React.useState(false);
    const [selectedAddress, setSelectedAddress] = React.useState<Address | null>(null);
    React.useEffect(() => {
        // set the default address as the address
        const address = addresses.find(address => address.isDefault);
        setSelectedAddress(address ?? null)
    }, []);
    // need to disable the payment element when there is no selected address
    const disablePymtBtn = selectedAddress === null || session?.data === null || isPending;
    const setAddress = (val: Address) => {
        setSelectedAddress(val);
    }
    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        if (isPending) return;
        setIsPending(true);
        try {
            if (!session?.data) throw Error('User not logged in');
            if (!selectedAddress) throw Error('No address selected');
            const shipping: PaymentIntentConfirmParams.Shipping = {
                name: session.data.user.name,
                phone: selectedAddress.phoneNumber,
                address: {
                    city: selectedAddress.city,
                    country: selectedAddress.country,
                    line1: selectedAddress.street,
                    postal_code: selectedAddress.zip,
                    state: selectedAddress.state,
                }
            }
            /* stripe. */
            await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/confirmed-order`,
                    receipt_email: session?.data?.user.email,
                    shipping,

                },
            })
        }
        catch (error) {
            errorLogger(error);
            toast.error('An error occurred while processing your payment');
        }
        finally {
            setIsPending(false);
        }
    }
    return (
        <section id="checkout-page" className="max-w-screen-lg gap-x-12 pb-10 grid lg:grid-cols-[1fr_300px] mx-auto relative">
            <div className="w-[95%] max-w-screen-md mx-auto lg:px-3 lg:max-w-none lg:w-full pt-6">
                {/* Create a new Address or Select either default or any other */}
                <DeliveryAddress
                    addresses={addresses}
                    selectedAddress={selectedAddress?.id ?? ''}
                    setAddress={setAddress}
                    disabled={isPending}
                />
                {/* Delivery Time */}
                <div className="my-5">
                    <h3 className="text-lg font-semibold">Delivery Time</h3>
                    <p className="text-sm text-neutral-500">Your order will be delivered within 3-5 business days</p>
                </div>

                {/* Stripe Payment Form */}
                <StripePaymentForm />
                {isMobile && (<OrderSummary />)}
            </div>
            <div className="lg:sticky fixed bottom-0  bg-slate-50 lg:bg-background z-[50] w-full lg:right-0 lg:top-20 lg:h-fit lg:pb-3 border-t min-h-32 lg:border border-neutral-300 lg:w-[300px]">
                {/* Order Summary */}
                {!isMobile && (<OrderSummary />)}
                <div className="px-3 py-6">
                    <div className="flex items-center  mb-2  justify-between ">
                        <h4 className="text-sm font-medium">
                            Subtotal{' '}
                            <span className="opacity-80">
                                ({cart.length} {pluralize('item', cart.length)})
                            </span>
                        </h4>
                        <p className="text-base font-medium">
                            ${cart.reduce((acc, item) => acc + Math.ceil(item.quantity * item.price), 0)}
                        </p>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium">
                            Delivery
                        </h4>
                        <p className="text-base font-medium">$0.00</p>
                    </div>
                    <p>By clicking this button you agree to our{''}
                        <span className="text-primary underline inline-block mx-0.5">terms</span>
                        and{''}
                        <span className="text-primary underline inline-block mx-0.5">conditions</span>
                    </p>
                    <div className="grid place-items-center">
                        <Button
                            onClick={handlePayment}
                            className="mt-5 w-[95%]"
                            disabled={disablePymtBtn}
                            size={'lg'}
                            showOnlySpinner
                            isLoading={isPending}
                        >
                            <DollarSignIcon size={20} className="mr-2" />
                            Place Order
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
