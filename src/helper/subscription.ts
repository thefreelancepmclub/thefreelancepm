"use sever";

import { prisma } from "@/lib/prisma";
import { Feature, FeatureName } from "@prisma/client";

// Map Stripe Subscription IDs to tier labels
export const tierModel = {
  [`${process.env.free_plan_id}`]: "free",
  [`${process.env.pro_plan_id}`]: "pro",
  [`${process.env.elite_plan_id}`]: "elite",
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

export type CurrentSubscription = {
  isActive: boolean;
  tier: string; // or define an enum if you have fixed tiers
  subscriptionId: string | null;
  startDate: Date | null;
  endDate: Date | null;
  features: Feature[];
  getFeature: (name: FeatureName) => Feature | null;
  subscription: {
    id: string;
    name: string;
    price: number;
    interval: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
} | null;
