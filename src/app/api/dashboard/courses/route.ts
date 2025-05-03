import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const category = searchParams.get("category") || undefined;
    const type = searchParams.get("type") || undefined;
    const searchQuery = searchParams.get("searchQuery") || undefined;
    const sortBy = searchParams.get("sortBy") || undefined;

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
        { status: 400 },
      );
    }

    // Build where clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    // Filter by category
    if (category && category !== "all") {
      where.category = category;
    }

    // Filter by type (CourseType)
    if (type && type !== "all") {
      where.type = type;
    }

    // Determine orderBy condition
    const orderBy: { [key: string]: "asc" | "desc" } = {};
    if (sortBy === "asc" || sortBy === "desc") {
      orderBy.createdAt = sortBy;
    } else {
      orderBy.createdAt = "desc"; // Default sort
    }

    // Search by title, description, or skills
    if (searchQuery) {
      const sanitizedQuery = searchQuery.trim();
      where.OR = [
        { title: { contains: sanitizedQuery, mode: "insensitive" } },
        { description: { contains: sanitizedQuery, mode: "insensitive" } },
        // If you have a field like `skills`, add:
        { skills: { hasSome: [sanitizedQuery] } },
      ];
    }

    // Get total count for pagination
    const totalItems = await prisma.course.count({ where });

    // Calculate pagination
    const totalPages = Math.ceil(totalItems / limit);
    const skip = (page - 1) * limit;

    // Fetch courses
    const courses = await prisma.course.findMany({
      where,
      skip,
      take: limit,
      orderBy,
    });

    return NextResponse.json({
      success: true,
      message:
        courses.length > 0
          ? "Courses fetched successfully"
          : "No courses found",
      data: courses,
      meta: {
        totalPages,
        totalItems,
        currentPage: page,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
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
  }
}
