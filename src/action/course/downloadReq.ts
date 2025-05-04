"use server";

import { auth } from "@/auth";
import { getCurrentSubscription } from "@/helper/subscription";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { webhookFor } from "../coaching/create-coaching";

export async function courseDownload(courseId: string) {
  const cu = await auth();

  if (!cu) {
    return {
      success: false,
      message: "You are not logged in",
    };
  }

  const currentSubscription = await getCurrentSubscription(
    cu.user.id as string,
  );

  if (!currentSubscription) {
    return {
      success: false,
      message: "You don't have a subscription",
    };
  }

  const course = await prisma.course.findFirst({
    where: {
      id: courseId,
    },
  });

  if (!course) {
    return {
      success: false,
      message: "Course not found",
    };
  }

  const isFreeCourse = course.category === "free";
  const isFreeUser = currentSubscription.tier === "free";

  if (isFreeCourse && isFreeUser) {
    return {
      success: true,
      message: "File download Link",
      file: course.file, // Assuming this is a URL or path to the file
    };
  }

  const isAlreadyPurchased = await prisma.userPurchasedCourse.findFirst({
    where: {
      userId: cu.user.id as string,
      courseId: course.id,
      isPaid: true,
    },
  });

  if (isAlreadyPurchased) {
    return {
      success: true,
      message: "File download Link",
      file: course.file,
    };
  }

  const purchaseData = await prisma.userPurchasedCourse.create({
    data: {
      userId: cu.user.id as string,
      courseId: course.id,
      isPaid: false,
    },
  });

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: cu.user.email || undefined,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: course.title,
            // images: [] // Optionally add course image here
          },
          unit_amount: Math.round((course.price ?? 0) * 100),
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.AUTH_URL}/courses/download/${cu.user.id}/${course.id}?payment=success`,
    cancel_url: `${process.env.AUTH_URL}/cancel`,
    metadata: {
      purchaseId: purchaseData.id,
      for: "course" as webhookFor,
    },
  });

  if (checkoutSession.url) {
    return {
      success: true,
      message: "Redirecting to checkout",
      url: checkoutSession.url,
    };
  }

  return {
    success: false,
    message: "You don't have access to this course",
  };
}
