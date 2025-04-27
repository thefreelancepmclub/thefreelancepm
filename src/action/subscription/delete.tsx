"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { revalidatePath } from "next/cache";

export async function deleteSubscription(id: string) {
  // Authenticate the user and check their role
  const cu = await auth();
  if (cu?.user?.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized: Only admins can delete subscriptions.",
    };
  }

  try {
    // Fetch the existing subscription from the database
    const existingSubscription = await prisma.subscription.findUnique({
      where: { id },
    });

    if (!existingSubscription) {
      return {
        success: false,
        message: "Subscription not found.",
      };
    }

    // Deactivate the associated Stripe product
    await stripe.products.update(existingSubscription.stripeProductId, {
      active: false, // Mark the product as inactive
    });

    // Deactivate the associated Stripe price
    await stripe.prices.update(existingSubscription.stripePriceId, {
      active: false, // Mark the price as inactive
    });

    // Delete the subscription from the database
    await prisma.subscription.delete({
      where: { id },
    });

    revalidatePath("/dashboard/subscription");

    // Return success response
    return {
      success: true,
      message: "Subscription deleted successfully.",
    };
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error deleting subscription:", error);

    // Check if the error is a Prisma-specific or Stripe-specific error
    if (error instanceof Error) {
      return {
        success: false,
        message: `Database or Stripe error: ${error.message}`,
      };
    }

    // Fallback for unexpected errors
    return {
      success: false,
      message: "An unexpected error occurred while deleting the subscription.",
    };
  }
}
