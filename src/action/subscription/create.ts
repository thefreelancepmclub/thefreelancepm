"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import {
  SubscriptionCreateFormValues,
  subscriptionSchema,
} from "@/schemas/subscription";
import { revalidatePath } from "next/cache";
import { webhookFor } from "../coaching/create-coaching";

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
    if (data.price === 0) {
      let liteSubscription = await prisma.subscription.findFirst({
        where: { title: "Freelancer Lite" },
      });
    
      if (!liteSubscription) {
        liteSubscription = await prisma.subscription.create({
          data: {
            title: "Freelancer Lite",
            price: 0,
            features: data.features,
            paymentLink: "N/A",
            stripeProductId: "free-lite",
            stripePriceId: "free-lite",
          },
        });
      }
    
      await prisma.userSubscription.create({
        data: {
          userId: cu.user.id!,
          subscriptionId: liteSubscription.id,
          status: "active",
        },
      });
    
      return {
        success: true,
        message: "Lite plan granted directly.",
        redirect: "/account",
      };
    }
    
    
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

export async function createCheckoutLink(
  priceId: string,
  productId: string,
  planId: string,
  planName: string,
) {
  // Step 1: Authenticate the user
  const cu = await auth();

  if (!cu?.user?.id) {
    return {
      success: false,
      message: "Required sign in to purchase subscription",
      loggedinRequired: true,
    };
  }

  if (planName.toLowerCase().includes("freelancer lite")) {
    const lite = await prisma.subscription.findFirst({
      where: { title: "Freelancer Lite" },
    });
  
    if (!lite) throw new Error("Lite plan not found");
  
    const existing = await prisma.userSubscription.findFirst({
      where: { userId: cu.user.id! },
    });
  
    if (existing) {
      return {
        success: true,
        message: "Already subscribed to a plan.",
        redirect: "/account",
      };
    }
  
    await prisma.userSubscription.create({
      data: {
        userId: cu.user.id!,
        subscriptionId: lite.id,
        status: "active",
      },
    });
  
    return {
      success: true,
      message: "Lite plan activated.",
      redirect: "/account",
    };
  }
  

  const userId = cu.user.id;

  try {
    // Step 2: Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Allow card payments
      customer_email: cu.user.email as string, // Pre-fill the email field with the user's email
      line_items: [
        {
          price: priceId, // The price ID of the subscription plan
          quantity: 1,
        },
      ],
      mode: "subscription", // For recurring subscriptions
      success_url: `${process.env.AUTH_URL}/success`, // Redirect after successful payment
      cancel_url: `${process.env.AUTH_URL}/cancel`, // Redirect if the user cancels
      metadata: {
        userId: userId, // Include the user's ID in the metadata,
        planId: planId, // Include the plan's price ID
        stripeProductId: productId,
        for: "subscription" as webhookFor,
      },
    });

    // Step 3: Return the checkout URL
    return {
      success: true,
      checkoutUrl: session.url, // The URL to redirect the user to Stripe Checkout
    };
  } catch (error) {
    console.error("Error creating checkout session:", error);

    // Handle errors gracefully
    return {
      success: false,
      message: "An error occurred while creating the checkout session.",
    };
  }
}
