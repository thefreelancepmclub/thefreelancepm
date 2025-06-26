/* app/api/stripe/webhook/route.ts */
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import type Stripe from "stripe";
export const runtime = "nodejs";         // need raw body support

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

/** Stripe sends payload as-is; read it as a buffer */
export async function POST(req: NextRequest) {
  const buf  = await req.arrayBuffer();
  const sig  = req.headers.get("stripe-signature")!;
  let event;

  try {
    event = stripe.webhooks.constructEvent(Buffer.from(buf), sig, WEBHOOK_SECRET);
  } catch (err) {
    console.error("⚠️  webhook signature failed", err);
    return NextResponse.json({ error: "signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const coachingId = session.metadata?.coachingId;
    if (coachingId) {
      await prisma.coachingSession.update({
        where: { id: coachingId },
        data:  { status: "paid" },
      });
    }
  }

  return NextResponse.json({ received: true });
}
