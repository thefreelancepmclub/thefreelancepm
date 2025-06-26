"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { tierModel } from "@/helper/subscription";
import { deriveFlags } from "@/lib/booking/validate";
import { stripe } from "@/lib/stripe";
import { coachingSchema, type CoachingSchema }           // ⬅️ value + type
  from "@/schemas/coaching";
import { DateTime } from "luxon";
import { redirect } from "next/navigation";
import type { Tier } from "@/lib/booking/logic";

function safeDate(
  dateInput?: string | Date | null,
  timeInput?: string | null,
): Date | undefined {
  if (!dateInput || !timeInput) return undefined;

  // normalise the calendar day
  const day = typeof dateInput === "string"
    ? DateTime.fromISO(dateInput)
    : DateTime.fromJSDate(dateInput);

  if (!day.isValid) return undefined;              // bad date from UI

  // parse "9:00 AM", "17:30", etc.
  const t = DateTime.fromFormat(timeInput.trim(), "h:mm a").isValid
    ? DateTime.fromFormat(timeInput.trim(), "h:mm a")
    : DateTime.fromFormat(timeInput.trim(), "H:mm");

  if (!t.isValid) return undefined;                // bad time from UI

  // merge → JS Date in UTC
  return day.set({ hour: t.hour, minute: t.minute }).toJSDate();
}

export type webhookFor = "subscription" | "coaching" | "template" | "course";

export async function createCoaching(data: CoachingSchema) {
  const cu = await auth();
  if (!cu?.user) redirect("/login");

  // ── 1) Load user + past coaching
  const user = await prisma.user.findFirst({
    where: { id: cu.user.id },
    include: { userSubscriptions: true, coachingSessions: true },
  });
  if (!user?.userSubscriptions?.length) {
    return { success: false, message: "No active subscription found." };
  }

  // ── 2) Validate payload (now includes sessionType)
  const parsed = coachingSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: parsed.error.message };
  }

  const {
    sessionType,              
    date,
    time,
    email,
    firstName,
    lastName,
  } = parsed.data;

  function makeCalendlyUrl(type: "consultation" | "coaching") {
    return type === "consultation"
      ? process.env.NEXT_PUBLIC_CALENDLY_CONSULT_URL!
      : process.env.NEXT_PUBLIC_CALENDLY_COACH_URL!;
  }

  // ── 3) Determine tier
  const sub = user.userSubscriptions[0];
   const tier: Tier =
     (tierModel[sub.subscriptionId as keyof typeof tierModel] ?? "pro") as Tier;

// ── 4) Centralised business rules (replaces the big if/else)
const { needsSlot, pay: requiresPayment } = deriveFlags(
  { sessionType, firstName, lastName, email },           // minimal shape
  {
    tier,
    freeRemaining: tier === "elite"
    ? user.coachingSessions.filter(c =>
        c.sessionType === "coaching" &&
        DateTime.fromJSDate(c.createdAt, { zone: "utc" }).hasSame(DateTime.utc(), "month")
      ).length === 0
    : false,
    isLegacyFree: tier === "free" && user.coachingSessions.length === 0, // legacy rule
  },
);

if (needsSlot && (!date || !time)) {
  return { success:false, message:"Select date & time" };
}
// ── 5) Create the new CoachingSession row
const coaching = await prisma.coachingSession.create({
  data: {
    userId:         user.id,
    sessionType,
    tierAtCreate:   tier,
    date: safeDate(date, time),
    requiresPayment,
    status:         requiresPayment ? "opened" : "paid",
  },
});


  // ── 6) Payment flow or Calendly link
  if (requiresPayment) {
    const session = await createCheckoutSession({
      email: user.email!,
      coachingId: coaching.id,
      userId: user.id,
    });
    return {
      success: true,
      checkoutUrl: session.url,
      message: "Payment required. Redirecting to checkout.",
    };
  }



  return {
    success: true,
    calendlyUrl: makeCalendlyUrl(sessionType),
    message: "Booking successful – pick a slot",
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
