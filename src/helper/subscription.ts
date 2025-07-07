// REMOVE THIS: "use server";

import { prisma } from "@/lib/prisma";
import { Feature, FeatureName } from "@prisma/client";

const freePlanId = process.env.NEXT_PUBLIC_FREE_PLAN_ID!;
const proPlanId = process.env.NEXT_PUBLIC_PRO_PLAN_ID!;
const elitePlanId = process.env.NEXT_PUBLIC_ELITE_PLAN_ID!;

// Make tierModel non-exported (remove export)
const tierModel = {
  [freePlanId]: "free",
  [proPlanId]: "pro",
  [elitePlanId]: "elite",
};

// Mark individual functions with "use server"
export async function getSubscriptionById(id: string) {
  "use server";
  const result = await prisma.subscription.findFirst({ where: { id } });
  return result;
}

export async function getCurrentSubscription(userId: string) {
  "use server";
  if (!userId) return null;
  
  const now = new Date();
  const currentSubscription = await prisma.userSubscription.findFirst({
    where: { userId, status: "active" },
    include: { features: true, subscription: true },
  });

  if (!currentSubscription) return null;

  const isExpired = currentSubscription.endDate 
    ? currentSubscription.endDate < now 
    : true;

  const featureMap = new Map(
    currentSubscription.features.map(f => [f.name, f])
  );

  return {
    isActive: !isExpired,
    tier: tierModel[currentSubscription.subscriptionId as keyof typeof tierModel] || "free",
    subscriptionId: currentSubscription.subscriptionId,
    startDate: currentSubscription.startDate,
    endDate: currentSubscription.endDate,
    features: currentSubscription.features,
    getFeature(name: FeatureName) {
      return featureMap.get(name) || null;
    },
    subscription: currentSubscription.subscription,
  };
}