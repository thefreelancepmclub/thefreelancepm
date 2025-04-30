"use sever";

import { prisma } from "@/lib/prisma";

export default async function getSubscriptionById(id: string) {
  const result = await prisma.subscription.findFirst({ where: { id } });

  return result;
}
