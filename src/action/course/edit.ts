"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CourseCreateType } from "@/schemas/course";
import { TemplateType } from "@prisma/client";

export async function editCourse(courseId: string, data: CourseCreateType) {
  const cu = await auth();

  // Check if user is authenticated and is an admin
  if (!cu || cu.user.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  try {
    // Check if the course exists
    const existingCourse = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!existingCourse) {
      return {
        success: false,
        message: "Course not found",
      };
    }

    // Update the course
    const updatedCourse = await prisma.course.update({
      where: { id: courseId },
      data: {
        title: data.title,
        description: data.description,
        instructor: data.instructor,
        category: data.category as TemplateType,
        price: Number(data.price) ?? undefined, // optional
        file: data.file, // assumes this is a file path or URL
        plan: data.plan, // assuming plan ID is provided
        published: data.publishNow ?? false,
      },
    });

    return {
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    };
  } catch (error) {
    console.error("Failed to update course:", error);
    return {
      success: false,
      message: "An error occurred while updating the course",
    };
  }
}
