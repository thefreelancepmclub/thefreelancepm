import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const type = searchParams.get("type") as "weekly" | "monthly";

  let startDate = new Date();

  switch (type) {
    case "weekly":
      startDate.setDate(startDate.getDate() - 6); // last 7 days including today
      break;
    case "monthly":
      startDate.setMonth(startDate.getMonth() - 11); // last 12 months including this one
      break;
    default:
      startDate = new Date(0);
  }

  try {
    // Fetch template purchases
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

    // Fetch coaching sessions
    const coachingSessions = await prisma.coachingSession.findMany({
      where: {
        date: {
          gte: startDate,
        },
        status: "paid"
      },
    });

    // Create a unified list of all revenue events
    const revenueData = [
      ...templatePurchases.map((p) => ({
        date: p.purchasedAt,
        amount: p.template?.price || 0,
      })),
      ...coachingSessions.map((c) => ({
        date: c.date,
        amount: 5000,
      })),
    ];

    // Group by day or month
    const grouped: Record<string, number> = {};

    revenueData                 // ① skip any nulls early
      .filter(d => d.date !== null)
      .forEach(item => {
        const date = item.date as Date;        // ② now safely non-null
        const key =
          type === "weekly"
            ? date.toLocaleDateString("en-US", { weekday: "short" }) // "Mon"
            : date.toLocaleDateString("en-US", { month: "short" });  // "Jan"
    
        grouped[key] = (grouped[key] || 0) + item.amount;
      });

    // Define full range
    const fullWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const fullMonth = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const labels = type === "weekly" ? fullWeek : fullMonth;

    // Build result with 0 fallback
    const result = labels.map((name) => ({
      name,
      value: grouped[name] || 0,
    }));

    return NextResponse.json({
      data: result,
      success: true,
      message: "Data retrived successfully",
    });
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
