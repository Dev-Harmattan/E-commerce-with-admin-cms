import Stripe from 'stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';
import prismaDb from '@/lib/prismadb';
import { Order } from '@prisma/client';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature') as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`WEBHOOK_ERROR: ${error?.message}`, {
      status: 400,
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;

  const addressContainer = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const addressString = addressContainer
    .filter((item) => item !== null)
    .join(', ');

  switch (event.type) {
    case 'checkout.session.completed':
      const order = await prismaDb.order.update({
        where: {
          id: session?.metadata?.orderId,
        },
        data: {
          isPaid: true,
          address: addressString,
          phone: session.customer_details?.phone || '',
        },
        include: {
          orderItems: true,
        },
      });
      const productIds = order.orderItems.map((item) => item.productId);

      await prismaDb.product.updateMany({
        where: {
          id: {
            in: productIds,
          },
        },
        data: {
          isAchieved: true,
        },
      });
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new NextResponse(null, { status: 200 });
}
