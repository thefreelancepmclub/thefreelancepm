"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function ClickedJob(id: string) {
  const cu = await auth();

  if (!cu) {
    return {
      success: false,
      message: "Please login to see the job",
    };
  }

  try {
    const job = await prisma.job.findUnique({
      where: { id },
      select: { applications: true },
    });

    if (!job) {
      return {
        success: false,
        message: "Job not found",
      };
    }

    // Check if user already applied
    if (cu.user.id && job.applications.includes(cu.user.id)) {
      return {
        success: true,
        message: "You have already applied to this job",
      };
    }

    // Add user to applications
    await prisma.job.update({
      where: { id },
      data: {
        applications: {
          push: cu.user.id,
        },
      },
    });

    return {
      success: true,
      message: "Job application submitted successfully",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "An unknown error occurred",
    };
  }
}
