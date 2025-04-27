"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import {
  SubscriptionCreateFormValues,
  subscriptionSchema,
} from "@/schemas/subscription";
import { revalidatePath } from "next/cache";

export async function createSubscription(values: SubscriptionCreateFormValues) {
  // Authenticate the user and check their role
  const cu = await auth();
  if (cu?.user?.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized: Only admins can create subscriptions.",
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
    // Create a product in Stripe
    const stripeProduct = await stripe.products.create({
      name: data.title,
      metadata: {
        features: JSON.stringify(data.features), // Store features as metadata
      },
    });

    // Create a price for the product in Stripe
    const stripePrice = await stripe.prices.create({
      unit_amount: Math.round(data.price * 100), // Convert price to cents
      currency: "usd", // Adjust currency as needed
      product: stripeProduct.id,
      recurring: {
        interval: "month", // Assuming monthly subscription
      },
    });

    // Generate a payment link for the price
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: stripePrice.id,
          quantity: 1,
        },
      ],
    });

    // Store the subscription details in the database
    const subscription = await prisma.subscription.create({
      data: {
        title: data.title,
        price: data.price,
        features: data.features,
        paymentLink: paymentLink.url, // Store the generated payment link
        stripeProductId: stripeProduct.id, // Store the Stripe product ID
        stripePriceId: stripePrice.id, // Store the Stripe price ID
      },
    });

    revalidatePath("/dashboard/subscription");

    // Return success response with the created subscription data
    return {
      success: true,
      message: "Subscription created successfully.",
      data: subscription,
    };
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error creating subscription:", error);

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
      message: "An unexpected error occurred while creating the subscription.",
    };
  }
}
