"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { TestimonialCreateType } from "@/schemas/testmonial";

export async function createTestimonial(data: TestimonialCreateType) {
  const cu = await auth();

  // Check if user is authenticated and is an admin
  if (!cu || cu.user.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  try {
    const newTestimonial = await prisma.testmonial.create({
      data: {
        fullName: data.fullName,
        jobTitle: data.jobTitle,
        message: data.message,
        rating: Number(data.rating),
        active: data.active,
      },
    });

    return {
      success: true,
      message: "Testimonial created successfully",
      data: newTestimonial,
    };
  } catch (error) {
    console.error("Failed to create testimonial:", error);
    return {
      success: false,
      message: "An error occurred while creating the testimonial",
    };
  }
}
