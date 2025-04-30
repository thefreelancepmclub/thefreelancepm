"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { TestimonialCreateType } from "@/schemas/testmonial";

export async function editTestimonial(
  testimonialId: string,
  data: TestimonialCreateType
) {
  const cu = await auth();

  // Check if user is authenticated and is an admin
  if (!cu || cu.user.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  try {
    // Check if the testimonial exists
    const existingTestimonial = await prisma.testmonial.findUnique({
      where: { id: testimonialId },
    });

    if (!existingTestimonial) {
      return {
        success: false,
        message: "Testimonial not found",
      };
    }

    // Update the testimonial
    const updatedTestimonial = await prisma.testmonial.update({
      where: { id: testimonialId },
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
      message: "Testimonial updated successfully",
      data: updatedTestimonial,
    };
  } catch (error) {
    console.error("Failed to update testimonial:", error);
    return {
      success: false,
      message: "An error occurred while updating the testimonial",
    };
  }
}
