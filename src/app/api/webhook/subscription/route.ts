import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { handleCoachingCheckout } from "./handlers/coaching";
import { handleSubscriptionCheckout } from "./handlers/subscription";

export async function POST(req: NextRequest) {
  const buf = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    if (!sig) {
      return new NextResponse("Missing stripe-signature header", {
        status: 400,
      });
    }

    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const purpose = session.metadata?.for;

      switch (purpose) {
        case "subscription":
          await handleSubscriptionCheckout(session);
          break;
        case "coaching":
          await handleCoachingCheckout(session);
          break;
        default:
          console.warn(`Unhandled checkout purpose: ${purpose}`);
          return new NextResponse("Unknown purpose", { status: 400 });
      }
    }

    return NextResponse.json({ received: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(`Webhook error: ${error.message}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
