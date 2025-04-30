"use server";

import { auth } from "@/auth";
import { edgeServer } from "@/lib/edgestore.config";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteCourse(courseId: string) {
  const cu = await auth();

  // Check if user is authenticated and is an admin
  if (!cu || cu.user.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  try {
    // Get the course first to access the file URL
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      return {
        success: false,
        message: "course not found",
      };
    }

    // Step 1: Delete file from Edge Store
    if (course.file) {
      await edgeServer.publicFiles.deleteFile({
        url: course.file, // make sure this URL matches what Edge Store expects
      });
    }

    // Step 2: Delete course from the database
    await prisma.course.delete({
      where: {
        id: courseId,
      },
    });

    // Step 3: Revalidate cache
    revalidatePath("/dashboard/content"); // fix typo from "/dashboard/conten"

    return {
      success: true,
      message: "course deleted successfully",
    };
  } catch (error) {
    console.error("Failed to delete course:", error);
    return {
      success: false,
      message: "An error occurred while deleting the course",
    };
  }
}
