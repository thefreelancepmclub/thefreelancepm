"use server";

import { auth } from "@/auth";
import { nylas } from "@/lib/nylas";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { coachingSchema, CoachingSchemaType } from "@/schemas/coaching";
import { DateTime } from "luxon";
import { redirect } from "next/navigation";

// Subscription tiers
const model = {
  "680e40a854471484d23cd2af": "free",
  "680e40f354471484d23cd2b0": "pro",
  "680e413c54471484d23cd2b1": "elite",
};

export async function createCoaching(data: CoachingSchemaType) {
  const cu = await auth();
  if (!cu?.user) redirect("/login");

  const admin = await prisma.user.findFirst({
    where: { role: "admin" },
  });

  if (!admin?.grantId) {
    return {
      success: false,
      message: "Admin calendar credentials not found.",
    };
  }

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
    model[subscription.subscriptionId as keyof typeof model] || "pro";

  // Parse booking datetime
  const startDateTime = DateTime.fromFormat(
    `${date} ${time}`,
    "yyyy-MM-dd h:mm a",
    { zone: "utc" }
  );
  const endDateTime = startDateTime.plus({ minutes: 30 });

  // Check calendar for conflicts
  const events = await nylas.events.list({
    identifier: admin.grantId,
    queryParams: { calendarId: admin.grantEmail as string },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isBusy = events.data.some((event: any) => {
    const eventStart = DateTime.fromSeconds(event.start_time, { zone: "utc" });
    const eventEnd = DateTime.fromSeconds(event.end_time, { zone: "utc" });
    return startDateTime < eventEnd && endDateTime > eventStart;
  });

  if (isBusy) {
    return { success: false, message: "This time slot is already booked." };
  }

  // Booking rules
  let requiresPayment = false;

  if (tier === "free") {
    if (user.coaching.length > 0) requiresPayment = true;
  } else if (tier === "elite") {
    const now = DateTime.utc();
    const hasBookedThisMonth = user.coaching.some((c) => {
      const bookedDate = DateTime.fromFormat(
        c.date.toISOString().split("T")[0],
        "yyyy-MM-dd",
        { zone: "utc" }
      );
      return bookedDate.hasSame(now, "month");
    });

    if (hasBookedThisMonth) requiresPayment = true;
  } else {
    requiresPayment = true;
  }

  if (requiresPayment) {
    const session = await createCheckoutSession({
      email: user.email as string,
      data: parsedData.data,
      userId: user.id,
    });

    return {
      success: true,
      checkoutUrl: session.url,
      message: "Payment required. Redirecting to checkout.",
    };
  }

  // Create coaching session (free/elite allowed)
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

interface Props {
  email: string;
  data: CoachingSchemaType;
  userId: string;
}

export async function createCheckoutSession({ email, data, userId }: Props) {
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
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      date: data.date.toString(),
      time: data.time,
      focusAreas: data.focusAreas.join(", "),
      notes: data.notes || "",
      userId,
    },
    success_url: `${process.env.AUTH_URL}/dashboard?success=true`,
    cancel_url: `${process.env.AUTH_URL}/dashboard?canceled=true`,
  });

  return { url: session.url };
}
