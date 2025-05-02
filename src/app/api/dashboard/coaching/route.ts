import { prisma } from "@/lib/prisma";
import { CoachingStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const currentPage = Math.max(page, 1);
    const itemsPerPage = Math.max(limit, 1);
    const skip = (currentPage - 1) * itemsPerPage;

    // Validate and set status filter
    let statusFilter: CoachingStatus | undefined = undefined;
    if (
      status &&
      Object.values(CoachingStatus).includes(status as CoachingStatus)
    ) {
      statusFilter = status as CoachingStatus;
    } else if (status) {
      return NextResponse.json(
        { success: false, message: "Invalid status filter" },
        { status: 400 }
      );
    }

    const whereClause = statusFilter ? { status: statusFilter } : {};

    const [totalItems, data] = await Promise.all([
      prisma.coaching.count({ where: whereClause }),
      prisma.coaching.findMany({
        where: whereClause,
        skip,
        take: itemsPerPage,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return NextResponse.json(
      {
        success: true,
        message: "",
        data,
        pagination: {
          currentPage,
          totalPages,
          totalItems,
          itemsPerPage,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
