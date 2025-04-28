import { stripe } from "@/lib/stripe";
import { FeatureName, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const prisma = new PrismaClient();

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
      const userId = session.metadata?.userId;
      const planId = session.metadata?.planId;
      const stripeProductId = session.metadata?.stripeProductId;

      if (!userId || !planId || !stripeProductId) {
        console.warn(
          "Missing userId, planId, or stripeProductId in checkout.session.completed"
        );
        return new NextResponse("Missing required metadata", { status: 400 });
      }

      // Define features based on planId
      const features = [];
      switch (planId) {
        case "680e40a854471484d23cd2af":
          features.push(
            {
              name: "templates",
              total: 10,
              remaining: 10,
              value: 5000,
              enabled: null,
            },
            {
              name: "courses",
              total: 1,
              remaining: 1,
              value: 5000,
              enabled: null,
            }
          );
          break;
        case "680e40f354471484d23cd2b0":
          features.push(
            {
              name: "templates",
              total: 100,
              remaining: 100,
              value: 1000,
              enabled: null,
            },
            {
              name: "courses",
              total: 5,
              remaining: 5,
              value: 5000,
              enabled: null,
            },
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
        case "680e413c54471484d23cd2b1":
          features.push(
            {
              name: "templates",
              total: 1100,
              remaining: 1100,
              value: 1160,
              enabled: null,
            },
            {
              name: "courses",
              total: 5,
              remaining: 5,
              value: 5000,
              enabled: null,
            },
            {
              name: "coaching",
              total: 1,
              remaining: 1,
              value: 50,
              enabled: null,
            },
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
          console.warn(`Unknown planId: ${planId}`);
          return new NextResponse("Invalid planId", { status: 400 });
      }

      // Find the subscription in the database
      const subscription = await prisma.subscription.findFirst({
        where: { stripeProductId },
      });

      if (!subscription) {
        console.warn(
          `Subscription not found for stripeProductId: ${stripeProductId}`
        );
        return new NextResponse("Subscription not found", { status: 400 });
      }

      // Calculate end date (assuming monthly subscription for simplicity)
      const startDate = new Date();
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);

      // Create or update UserSubscription
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

      // Delete existing features for this UserSubscription to avoid duplicates
      await prisma.feature.deleteMany({
        where: { userSubscriptionId: userSubscription.id },
      });

      // Create new Feature records
      await prisma.feature.createMany({
        data: features.map((feature) => ({
          userSubscriptionId: userSubscription.id,
          name: feature.name as FeatureName, // Cast name to FeatureName type
          total: feature.total,
          remaining: feature.remaining,
          value: feature.value,
          enabled: feature.enabled,
        })),
      });
    }

    return new NextResponse(JSON.stringify({ received: true }), {
      status: 200,
    });

    //eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(`Error processing webhook event: ${error.message}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
