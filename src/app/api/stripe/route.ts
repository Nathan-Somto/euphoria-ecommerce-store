import Stripe from 'stripe';
interface RequestBody {
    currency: 'usd' | 'ngn';
    items: { price: number, quantity: number }[];
}
export async function POST(req: Request) {
    const { items, currency } = (await req.json()) as RequestBody;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
        maxNetworkRetries: 3
    });
    // done on server to prevent malicious activity.
    const amount = items.reduce((acc, item) => acc + Math.ceil(item.price * item.quantity), 0);
    const paymentIntent = await stripe.paymentIntents.create({
        currency,
        amount,
        payment_method_types: ['card'],
    });
    return Response.json({ client_secret: paymentIntent.client_secret });
}