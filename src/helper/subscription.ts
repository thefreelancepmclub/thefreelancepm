"use sever";

import { prisma } from "@/lib/prisma";
import { FeatureName } from "@prisma/client";

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

export async function getCurrentSubscription(userId: string) {
  const now = new Date();
  const currentSubscription = await prisma.userSubscription.findFirst({
    where: {
      userId,
      status: "active",
    },
    include: {
      features: true,
      subscription: true,
    },
  });

  if (!currentSubscription) return null;

  const isExpired = currentSubscription?.endDate
    ? currentSubscription.endDate < now
    : true;

  // Build a feature lookup map
  const featureMap = new Map(
    currentSubscription.features.map((feature) => [feature.name, feature]),
  );

  return {
    isActive: !isExpired,
    tier:
      tierModel[
        currentSubscription?.subscriptionId as keyof typeof tierModel
      ] || "free",
    subscriptionId: currentSubscription?.subscriptionId,
    startDate: currentSubscription?.startDate,
    endDate: currentSubscription?.endDate,
    features: currentSubscription.features,
    getFeature(name: FeatureName) {
      return featureMap.get(name) || null;
    },
    subscription: currentSubscription.subscription,
  };
}
