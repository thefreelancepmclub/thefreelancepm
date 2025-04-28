import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

// Define the return type with populated userSubscriptions
export type GetUserResponse = Awaited<ReturnType<typeof getUser>>;

// GET handler to fetch user with subscriptions
export async function GET(request: Request) {
  const cu = await auth();

  if (!cu) redirect("/login");

  if (cu.user.role !== "admin") {
    return NextResponse.json(
      {
        success: false,
        message: "You don't have access",
      },
      { status: 403 }
    );
  }
  try {
    const { searchParams } = new URL(request.url);
    const isActiveParam = searchParams.get("isActive");
    const planIdParam = searchParams.get("planId");

    // Validate query parameters
    if (isActiveParam && !["true", "false", "all"].includes(isActiveParam)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid isActive parameter. Must be 'true', 'false', or 'all'",
        },
        { status: 400 }
      );
    }

    if (planIdParam && planIdParam !== "all") {
      // Verify if planId exists
      const subscriptionExists = await prisma.subscription.findUnique({
        where: { id: planIdParam },
      });
      if (!subscriptionExists) {
        return NextResponse.json(
          { message: "Invalid planId. Subscription not found", success: false },
          { status: 400 }
        );
      }
    }

    const users = await getUser(isActiveParam, planIdParam);

    if (!users || users.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No User found",
        data: [],
      });
    }

    return NextResponse.json({
      success: true,
      message: "data retrived successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}

// Helper function to fetch users with subscriptions
async function getUser(
  isActiveParam: string | null,
  planIdParam: string | null
) {
  // Build the where clause based on query parameters
  // eslint-disable-next-line
  const where: any = {};

  // Filter by isActive @typescript-eslint/no-explicit-any
  if (isActiveParam && isActiveParam !== "all") {
    where.isActive = isActiveParam === "true";
  }

  // Filter by planId (subscription)
  if (planIdParam && planIdParam !== "all") {
    where.userSubscriptions = {
      some: {
        subscriptionId: planIdParam,
        status: "active", // Only include active subscriptions
      },
    };
  }

  return prisma.user.findMany({
    where,
    include: {
      userSubscriptions: {
        include: {
          subscription: true,
          features: true, // Include features for completeness
        },
      },
    },
  });
}
