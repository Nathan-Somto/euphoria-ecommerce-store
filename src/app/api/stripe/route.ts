import { NextResponse } from 'next/server';
import { prettifyZodErrors } from '@/utils/prettifyZodErrors';
import Stripe from 'stripe';
import prisma from '@/lib/prisma'
import { cookies } from 'next/headers';
import { errorLogger } from '@/utils/errorLogger';
import { type IntentSchema, intentSchema } from '@/schema/intent.schema';
import { calculateTotal } from '@/utils/calculateTotal';
interface RequestBody extends IntentSchema {

}
export async function POST(req: Request) {
    try {
        // keeping the orderId in a cookie is done to keep the order in sync with the cart and client.
        const orderId = cookies().get('orderId')
        console.log("the order id is: ", orderId)
        const { items, currency, userId } = (await req.json()) as RequestBody;
        const validatedBody = intentSchema.safeParse({
            items,
            currency,
            userId
        });
        if (!validatedBody.success) {
            return Response.json({
                message: prettifyZodErrors(validatedBody.error)
            }, {
                status: 401
            })
        }
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
            maxNetworkRetries: 3,
            typescript: true,
        });
        // transaction to keep the order, ordered products in sync with client side cart.
        const order = await prisma.$transaction(async (tx) => {
            if (orderId?.value) {
                const foundOrder = await tx.order.findFirst({
                    where: { id: orderId.value, status: 'PENDING' },
                });
                if (foundOrder) {
                    await tx.orderedProduct.deleteMany({ where: { orderId: orderId.value } });
                    await tx.order.delete({ where: { id: orderId.value } });
                }
            }

            return await tx.order.create({
                data: {
                    status: 'PENDING',
                    userId,
                    address: '',
                    orderedProducts: {
                        create: items.map(item => ({ productId: item.productId, quantity: item.quantity })),
                    },
                },
                select: { id: true },
            });
        })
        // done on server to prevent malicious activity.
        const { actualTotal: amount } = calculateTotal(items);
        const paymentIntent = await stripe.paymentIntents.create({
            currency,
            amount: amount * 100,
            payment_method_types: ['card'],
            metadata: {
                orderId: order.id
            }
        });
        cookies().set('orderId', order.id, {
            maxAge: 60 * 60 * 24 * 7, // 1 week,
            httpOnly: true,
        })
        return NextResponse.json({ client_secret: paymentIntent.client_secret });
    } catch (error) {
        errorLogger(error);
        return NextResponse.json({
            message: 'An error occurred'
        }, {
            status: 500
        })

    }
}