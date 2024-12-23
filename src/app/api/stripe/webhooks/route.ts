import stripe from "stripe";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidateTag } from "next/cache";
export async function POST(request: Request) {
    const sig = headers().get('stripe-signature') as string;
    let event;
    const constructAddressString = (address?: stripe.Address) => {
        if (!address) return '';
        return `${address.line1 ?? ''}, ${address.city ?? ''}, ${address.state ?? ''}, ${address.country ?? ''}, ${address.postal_code ?? ''}`
    }
    try {
        const body = (await request.text());
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET as string);
        const session = event.data.object as stripe.PaymentIntent;
        switch (event.type) {
            case 'payment_intent.succeeded':
                console.log("Session in Success event: ", session);
                const order = await prisma.order.update({
                    where: {
                        id: session?.metadata?.orderId
                    },
                    data: {
                        status: "PAID",
                        address: constructAddressString(session?.shipping?.address),
                        paidTime: new Date()
                    },
                    select: {
                        orderedProducts: {
                            select: {
                                productId: true,
                                quantity: true
                            }
                        }
                    }
                });
                const cleanProductIds = order.orderedProducts.filter(item => item.productId !== null);
                // find many products in the order that are not null
                const productUnits = await prisma.product.findMany({
                    where: {
                        id: {
                            in: cleanProductIds.map(product => product.productId) as string[]
                        }
                    },
                    select: {
                        units: true,
                        id: true
                    }
                });
                // honestly, this is a very bad way to do this
                // deduct the quantity of every product that is in the ordered product 
                await prisma.$transaction(cleanProductIds.map(product => {
                    // prevent negative values from being the units left
                    // decrement the units of the product
                    const foundProduct = productUnits.find(item => item.id === product.productId);
                    if (!foundProduct) throw Error('Product not found');
                    const decreaseBy = Math.min(foundProduct.units, Math.abs(product.quantity));
                    return prisma.product.update({
                        where: {
                            id: product.productId ?? ''
                        },
                        data: {
                            units: {
                                decrement: decreaseBy,
                            },
                            inStock: decreaseBy !== foundProduct.units
                        }
                    })
                }));
                revalidateTag('products');
                break;
            case 'payment_intent.payment_failed':
                console.log("Session in Failed event: ", session);
                // set the order status to failed
                await prisma.order.update({
                    where: {
                        id: session?.metadata?.orderId
                    },
                    data: {
                        status: "FAILED",
                        address: constructAddressString(session?.shipping?.address),
                        failedTime: new Date()
                    }
                });
                break;
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }
        return Response.json({ received: true });
    } catch (err) {
        return Response.json({ message: `Webhook Error: ${(err as Error).message}` }, { status: 400 });
    }
}