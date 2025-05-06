"use server";

import { prisma } from "@/lib/prisma";

export async function subscribeToJobAlert(email: string) {
  const exist = await prisma.jobAlert.findFirst({
    where: {
      email,
    },
  });

  if (exist) {
    return {
      success: false,
      message: "This email is already subscribed to job alerts.",
    };
  }

  try {
    await prisma.jobAlert.create({
      data: {
        email,
      },
    });

    return {
      success: true,
      message: "Subscribed successfully to job alerts!",
    };
  } catch (error) {
    console.error("Failed to subscribe to job alert:", error);
    return {
      success: false,
      message: "An error occurred while subscribing. Please try again later.",
    };
  }
}
