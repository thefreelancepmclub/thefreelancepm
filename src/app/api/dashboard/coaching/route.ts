import { prisma } from "@/lib/prisma";
import { CoachingStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const status = searchParams.get("status") || "all";
    const query = searchParams.get("query") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    // Validate pagination
    if (page < 1 || limit < 1) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid pagination parameters",
          data: [],
          meta: {
            totalPages: 0,
            totalItems: 0,
            currentPage: page,
            itemsPerPage: limit,
          },
        },
        { status: 400 },
      );
    }

    // Build `where` clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (status !== "all") {
      if (Object.values(CoachingStatus).includes(status as CoachingStatus)) {
        where.status = status;
      } else {
        return NextResponse.json(
          { success: false, message: "Invalid status filter", data: [] },
          { status: 400 },
        );
      }
    }

    if (query) {
      where.OR = [
        { firstName: { contains: query, mode: "insensitive" } },
        { lastName: { contains: query, mode: "insensitive" } },
      ];
    }

    const totalItems = await prisma.coaching.count({ where });
    const totalPages = Math.ceil(totalItems / limit);
    const skip = (page - 1) * limit;

    const coachings = await prisma.coaching.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      message:
        coachings.length > 0
          ? "Coaching records fetched successfully"
          : "No coaching records found",
      data: coachings,
      meta: {
        totalPages,
        totalItems,
        currentPage: page,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Error fetching coachings:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        data: [],
        meta: {
          totalPages: 0,
          totalItems: 0,
          currentPage: 1,
          itemsPerPage: 10,
        },
      },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
