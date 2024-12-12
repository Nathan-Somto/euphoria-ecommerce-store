import { PaymentElement } from '@stripe/react-stripe-js'
import React from 'react'

export default function StripePaymentForm() {
    return (
        <form id="payment-form" className="max-w-screen-md lg:max-w-screen-sm w-full my-5">
            <PaymentElement
                id="payment-element"
                options={{
                    layout: {
                        type: "tabs",
                        defaultCollapsed: false
                    }
                }} />
        </form>
    )
}
