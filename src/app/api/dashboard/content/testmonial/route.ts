import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // Validate pagination parameters
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
        { status: 400 }
      );
    }

    // Get total count for pagination
    const totalItems = await prisma.testmonial.count();

    // Calculate pagination
    const totalPages = Math.ceil(totalItems / limit);
    const skip = (page - 1) * limit;

    // Fetch testimonials
    const testimonials = await prisma.testmonial.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      message:
        testimonials.length > 0
          ? "Testimonials fetched successfully"
          : "No testimonials found",
      data: testimonials,
      meta: {
        totalPages,
        totalItems,
        currentPage: page,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
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
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
