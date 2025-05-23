import { getAddresses } from "@/actions/address.actions";
import CheckoutClient from "./components/checkout-client";
import StripeProvider from "@/providers/stripe-provider";
import { currentSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";
import { checkIfBanned } from "@/utils/checkIfBanned";

export default async function CheckoutPage() {
    const { data: addresses } = await getAddresses()
    const session = await currentSession();
    if (!session) return redirect('/404');
    if (checkIfBanned(session)) return redirect('/banned');
    return (
        <StripeProvider
            pk={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
            userId={session.user.id}
        >
            <CheckoutClient addresses={addresses ?? []} />
        </StripeProvider>
    )
}
