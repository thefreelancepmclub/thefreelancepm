"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import {
  SubscriptionCreateFormValues,
  subscriptionSchema,
} from "@/schemas/subscription";
import { revalidatePath } from "next/cache";

export async function editSubscription(
  id: string,
  values: SubscriptionCreateFormValues
) {
  // Authenticate the user and check their role
  const cu = await auth();
  if (cu?.user?.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized: Only admins can edit subscriptions.",
    };
  }

  // Validate the input data using the schema
  const { success, error, data } = subscriptionSchema.safeParse(values);

  if (!success) {
    return {
      success: false,
      message: `Validation failed: ${error.message}`,
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

    // Update the Stripe product
    const updatedStripeProduct = await stripe.products.update(
      existingSubscription.stripeProductId,
      {
        name: data.title,
        metadata: {
          features: JSON.stringify(data.features),
        },
      }
    );

    let updatedStripePriceId = existingSubscription.stripePriceId;

    // If the price has changed, create a new price and deactivate the old one
    if (data.price !== existingSubscription.price) {
      // Create a new price in Stripe
      const newStripePrice = await stripe.prices.create({
        unit_amount: Math.round(data.price * 100), // Convert price to cents
        currency: "usd", // Adjust currency as needed
        product: updatedStripeProduct.id,
        recurring: {
          interval: "month", // Assuming monthly subscription
        },
      });

      updatedStripePriceId = newStripePrice.id;

      // Deactivate the old price
      await stripe.prices.update(existingSubscription.stripePriceId, {
        active: false,
      });
    }

    // Ensure the product is active before creating a payment link
    await stripe.products.update(updatedStripeProduct.id, {
      active: true, // Explicitly set the product to active
    });

    // Generate a new payment link using the updated price ID
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: updatedStripePriceId,
          quantity: 1,
        },
      ],
    });

    // Update the subscription details in the database
    const updatedSubscription = await prisma.subscription.update({
      where: { id },
      data: {
        title: data.title,
        price: data.price,
        features: data.features,
        paymentLink: paymentLink.url,
        stripePriceId: updatedStripePriceId,
      },
    });

    revalidatePath("/dashboard/subscription");

    // Return success response with the updated subscription data
    return {
      success: true,
      message: "Subscription updated successfully.",
      data: updatedSubscription,
    };
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error updating subscription:", error);

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
      message: "An unexpected error occurred while updating the subscription.",
    };
  }
}
