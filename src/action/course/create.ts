"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CourseCreateType } from "@/schemas/course";
import { TemplateType } from "@prisma/client";

export async function createCourse(data: CourseCreateType) {
  const cu = await auth();

  // Check if user is authenticated and is an admin
  if (!cu || cu.user.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  try {
    // Create the template
    const newTemplate = await prisma.course.create({
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
      message: "Template created successfully",
      data: newTemplate,
    };
  } catch (error) {
    console.error("Failed to create template:", error);
    return {
      success: false,
      message: "An error occurred while creating the template",
    };
  }
}
