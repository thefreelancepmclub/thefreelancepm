import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function handleCoachingCheckout(session: Stripe.Checkout.Session) {
  const coachingId = session.metadata?.coachingId;

  if (!coachingId) {
    throw new Error("Missing coachingId in metadata");
  }

  // Mark the coaching session as paid
  await prisma.coachingSession.update({
    where: { id: coachingId },
    data: {
      status: "paid",
            // you can optionally flip the flag that was set on creation:
            requiresPayment: false,
          },
  });
}
