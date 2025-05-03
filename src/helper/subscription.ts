"use sever";

import { prisma } from "@/lib/prisma";

// Map Stripe Subscription IDs to tier labels
export const tierModel = {
  "680e40a854471484d23cd2af": "free",
  "680e40f354471484d23cd2b0": "pro",
  "680e413c54471484d23cd2b1": "elite",
};

export default async function getSubscriptionById(id: string) {
  const result = await prisma.subscription.findFirst({ where: { id } });

  return result;
}
