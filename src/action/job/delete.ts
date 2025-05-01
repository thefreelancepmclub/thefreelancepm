"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function deleteJob(id: string) {
  const session = await auth();

  // Check if user is authenticated and is an admin
  if (!session || session.user.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  try {
    // Delete the job
    await prisma.job.delete({
      where: { id },
    });

    return {
      success: true,
      message: "Job deleted successfully",
    };
  } catch (error) {
    console.error("Failed to delete job:", error);

    return {
      success: false,
      message: "An error occurred while deleting the job",
    };
  }
}
