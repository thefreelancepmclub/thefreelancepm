import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const type = searchParams.get("type") as "weekly" | "monthly" | "yearly";

  let startDate = new Date();

  switch (type) {
    case "weekly":
      startDate.setDate(startDate.getDate() - 7);
      break;
    case "monthly":
      startDate.setMonth(startDate.getMonth() - 1);
      break;
    case "yearly":
      startDate.setFullYear(startDate.getFullYear() - 1);
      break;
    default:
      startDate = new Date(0); // All time
  }

  try {
    // 1. New users
    const users = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
    });
    const newUsers = users.length;

    // 2. Active subscriptions
    const activeSubscriptions = await prisma.userSubscription.count({
      where: {
        status: "active",
      },
    });

    // 3. Revenue from templates purchased
    const templatePurchases = await prisma.userPurchasedTemplate.findMany({
      where: {
        purchasedAt: {
          gte: startDate,
        },
        isPaid: true,
      },
      include: {
        template: true,
      },
    });

    const templateRevenue = templatePurchases.reduce(
      (sum, purchase) => sum + (purchase.template?.price || 0),
      0,
    );
    const PRICE_PER_SESSION_USD = 50;
    // 4. Revenue from coaching sessions
    const coachingSessions = await prisma.coachingSession.findMany({
      where: {
        date: {
          gte: startDate,
        },
        status: "paid",
      },
    });

    const coachingRevenue = coachingSessions.length * PRICE_PER_SESSION_USD;

    // 5. Total revenue
    const totalRevenue = templateRevenue + coachingRevenue;

    // 6. Total job applications
    const jobApplications = await prisma.userJobActivity.findMany({
      where: {
        appliedAt: {
          gte: startDate,
        },
      },
    });

    const totalJobApplications = jobApplications.length;

    return NextResponse.json({
      success: true,
      message: "Data Retrive successfully",
      data: {
        newUsers,
        totalRevenue,
        activeSubscriptions,
        totalJobApplications,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
