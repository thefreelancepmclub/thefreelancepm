"use server";

import { auth } from "@/auth";
import { tierModel } from "@/helper/subscription";
import { nylas } from "@/lib/nylas";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { coachingSchema, CoachingSchemaType } from "@/schemas/coaching";
import { DateTime } from "luxon";
import { redirect } from "next/navigation";

export type webhookFor = "subscription" | "coaching" | "template" | "course";

export async function createCoaching(data: CoachingSchemaType) {
  const cu = await auth();
  if (!cu?.user) redirect("/login");

  // Find admin to access Nylas calendar
  const admin = await prisma.user.findFirst({
    where: { role: "admin" },
  });

  if (!admin?.grantId) {
    return {
      success: false,
      message: "Admin calendar credentials not found.",
    };
  }

  // Get current user with their subscriptions and previous coaching sessions
  const user = await prisma.user.findFirst({
    where: { id: cu.user.id },
    include: {
      userSubscriptions: true,
      coaching: true,
    },
  });

  if (!user?.userSubscriptions || user.userSubscriptions.length === 0) {
    return {
      success: false,
      message:
        "No active subscription found. Please subscribe to book a session.",
    };
  }

  // Validate incoming form data
  const parsedData = coachingSchema.safeParse(data);
  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.message,
    };
  }

  const {
    date,
    time,
    email,
    firstName,
    lastName,
    focusAreas,
    phoneNumber,
    notes,
  } = parsedData.data;

  const subscription = user.userSubscriptions[0];
  const tier =
    tierModel[subscription.subscriptionId as keyof typeof tierModel] || "pro";

  // Convert date + time string to Luxon DateTime object (in UTC)
  const startDateTime = DateTime.fromFormat(
    `${date} ${time}`,
    "yyyy-MM-dd h:mm a",
    { zone: "utc" },
  );
  const endDateTime = startDateTime.plus({ minutes: 30 });

  // Query admin's calendar to check for overlapping events
  const events = await nylas.events.list({
    identifier: admin.grantId,
    queryParams: { calendarId: admin.grantEmail as string },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isBusy = events.data.some((event: any) => {
    const eventStart = DateTime.fromSeconds(event.start_time, { zone: "utc" });
    const eventEnd = DateTime.fromSeconds(event.end_time, { zone: "utc" });

    // Return true if event overlaps with desired time slot
    return startDateTime < eventEnd && endDateTime > eventStart;
  });

  if (isBusy) {
    return { success: false, message: "This time slot is already booked." };
  }

  // Determine if payment is required based on subscription tier & usage
  let requiresPayment = false;

  if (tier === "free") {
    // Free tier gets 1 free coaching
    if (user.coaching.length > 0) requiresPayment = true;
  } else if (tier === "elite") {
    // Elite gets 1 free coaching per month
    const now = DateTime.utc();
    const hasBookedThisMonth = user.coaching.some((c) => {
      const bookedDate = DateTime.fromJSDate(c.date, { zone: "utc" });
      return bookedDate.hasSame(now, "month");
    });

    if (hasBookedThisMonth) requiresPayment = true;
  } else {
    // All other tiers (e.g. Pro) must pay
    requiresPayment = true;
  }

  if (requiresPayment) {
    // Create unpaid coaching entry and generate checkout session
    const coaching = await prisma.coaching.create({
      data: {
        amount: 0,
        date,
        time,
        email,
        firstName,
        lastName,
        focusArea: focusAreas,
        phone: phoneNumber,
        notes: notes || "",
        userId: user.id,
        isPaid: false,
      },
    });

    const session = await createCheckoutSession({
      email: user.email as string,
      coachingId: coaching.id,
      userId: user.id,
    });

    return {
      success: true,
      checkoutUrl: session.url,
      message: "Payment required. Redirecting to checkout.",
    };
  }

  // Otherwise, book session directly
  await prisma.coaching.create({
    data: {
      amount: 0,
      date,
      time,
      email,
      firstName,
      lastName,
      focusArea: focusAreas,
      phone: phoneNumber,
      notes: notes || "",
      userId: user.id,
      isPaid: true,
    },
  });

  return {
    success: true,
    message: "Your session has been booked successfully.",
  };
}

// Create Stripe Checkout Session for one-time coaching payment
interface Props {
  email: string;
  coachingId: string;
  userId: string;
}

export async function createCheckoutSession({
  email,
  coachingId,
  userId,
}: Props) {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "1:1 Coaching Session",
            description: "Book a coaching session with a certified coach.",
          },
          unit_amount: 5000, // $50.00 USD
        },
        quantity: 1,
      },
    ],
    metadata: {
      coachingId,
      userId,
      for: "coaching" as webhookFor, // helpful for distinguishing in webhook
    },
    success_url: `${process.env.AUTH_URL}/success`,
    cancel_url: `${process.env.AUTH_URL}/cancel`,
  });

  return { url: session.url };
}
