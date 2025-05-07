// server-actions/planPerformance.ts
"use server";

import { tierModel } from "@/helper/subscription";
import { prisma } from "@/lib/prisma";
import { format, startOfMonth, subMonths } from "date-fns";

export async function getTopPerformingPlan() {
  const twelveMonthsAgo = subMonths(new Date(), 11); // Get date 11 months ago (to include current)
  const subscriptions = await prisma.userSubscription.findMany({
    where: {
      createdAt: {
        gte: twelveMonthsAgo,
      },
    },
    select: {
      createdAt: true,
      subscription: true,
      subscriptionId: true,
    },
  });

  // Initialize all months with zero counts
  const monthlyPlanCounts: Record<
    string,
    { lite: number; pro: number; elite: number }
  > = {};

  const sortedMonths: string[] = [];
  for (let i = 0; i < 12; i++) {
    const date = subMonths(new Date(), 11 - i);
    const monthKey = format(date, "MMM");
    sortedMonths.push(monthKey);
    monthlyPlanCounts[monthKey] = { lite: 0, pro: 0, elite: 0 };
  }

  // Count subscriptions per month
  for (const sub of subscriptions) {
    const date = new Date(sub.createdAt);
    const month = format(startOfMonth(date), "MMM"); // Group by full month
    const planId = sub.subscription.id;
    const planName = tierModel[planId as keyof typeof tierModel] || "free";

    if (!monthlyPlanCounts[month]) {
      monthlyPlanCounts[month] = { lite: 0, pro: 0, elite: 0 };
    }

    // Map 'free' to 'lite' as per your output format
    const chartKeyName: keyof (typeof monthlyPlanCounts)[string] =
      planName === "free" ? "lite" : (planName as "pro" | "elite" | "lite");

    monthlyPlanCounts[month][chartKeyName]++;
  }

  // Build final chart data in order from oldest to newest
  const chartData = sortedMonths.map((month) => ({
    month,
    ...monthlyPlanCounts[month],
  }));

  return chartData;
}
