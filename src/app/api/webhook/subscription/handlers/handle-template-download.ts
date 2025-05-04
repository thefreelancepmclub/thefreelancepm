// handlers/template.ts
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function handleTemplateCheckout(session: Stripe.Checkout.Session) {
  const purchaseId = session.metadata?.purchaseId;

  if (!purchaseId) {
    throw new Error("Missing metadata fields for template checkout");
  }

  await prisma.userPurchasedTemplate.update({
    where: { id: purchaseId },
    data: {
      isPaid: true,
      purchasedAt: new Date(),
    },
  });
}
