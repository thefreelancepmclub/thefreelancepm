import { prisma } from "@/lib/prisma";
import { FeatureName } from "@prisma/client";
import Stripe from "stripe";

export async function handleSubscriptionCheckout(
  session: Stripe.Checkout.Session
) {
  const userId = session.metadata?.userId;
  const planId = session.metadata?.planId;
  const stripeProductId = session.metadata?.stripeProductId;

  if (!userId || !planId || !stripeProductId) {
    throw new Error("Missing required metadata for subscription");
  }

  // Define features per plan
  const features = [];
  switch (planId) {
    case "680e40a854471484d23cd2af": // Free
      features.push(
        {
          name: "templates",
          total: 10,
          remaining: 10,
          value: 5000,
          enabled: null,
        },
        { name: "courses", total: 1, remaining: 1, value: 5000, enabled: null }
      );
      break;
    case "680e40f354471484d23cd2b0": // Pro
      features.push(
        {
          name: "templates",
          total: 100,
          remaining: 100,
          value: 1000,
          enabled: null,
        },
        { name: "courses", total: 5, remaining: 5, value: 5000, enabled: null },
        {
          name: "job_board",
          total: null,
          remaining: null,
          value: null,
          enabled: true,
        },
        {
          name: "resume",
          total: null,
          remaining: null,
          value: null,
          enabled: true,
        },
        {
          name: "slack_community_access",
          total: null,
          remaining: null,
          value: null,
          enabled: true,
        },
        {
          name: "personalized_account_portal",
          total: null,
          remaining: null,
          value: null,
          enabled: true,
        }
      );
      break;
    case "680e413c54471484d23cd2b1": // Elite
      features.push(
        {
          name: "templates",
          total: 1100,
          remaining: 1100,
          value: 1160,
          enabled: null,
        },
        { name: "courses", total: 5, remaining: 5, value: 5000, enabled: null },
        { name: "coaching", total: 1, remaining: 1, value: 50, enabled: null },
        {
          name: "vip_slack_access",
          total: null,
          remaining: null,
          value: null,
          enabled: true,
        },
        {
          name: "unlimited_resume_reviews",
          total: null,
          remaining: null,
          value: 50,
          enabled: true,
        }
      );
      break;
    default:
      throw new Error(`Unknown planId: ${planId}`);
  }

  const subscription = await prisma.subscription.findFirst({
    where: { stripeProductId },
  });

  if (!subscription) throw new Error("Subscription not found");

  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 1);

  const userSubscription = await prisma.userSubscription.upsert({
    where: {
      userId_subscriptionId: {
        userId,
        subscriptionId: subscription.id,
      },
    },
    create: {
      userId,
      subscriptionId: subscription.id,
      stripeSessionId: session.id,
      status: "active",
      startDate,
      endDate,
    },
    update: {
      stripeSessionId: session.id,
      status: "active",
      startDate,
      endDate,
    },
  });

  await prisma.feature.deleteMany({
    where: { userSubscriptionId: userSubscription.id },
  });

  await prisma.feature.createMany({
    data: features.map((feature) => ({
      userSubscriptionId: userSubscription.id,
      name: feature.name as FeatureName,
      total: feature.total,
      remaining: feature.remaining,
      value: feature.value,
      enabled: feature.enabled,
    })),
  });
}
