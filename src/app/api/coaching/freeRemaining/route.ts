// src/app/api/coaching/freeRemaining/route.ts
import { auth }             from "@/auth";
import { prisma }           from "@/lib/prisma";
import { startOfMonth }     from "date-fns";
import { NextResponse }     from "next/server";

export async function GET() {
  const cu = await auth();
  if (!cu?.user) {
    return NextResponse.json({ success: false, freeRemaining: false });
  }

  const start = startOfMonth(new Date());

  const count = await prisma.coachingSession.count({
    where: {
      userId: cu.user.id,
      sessionType: "coaching",
      createdAt: { gte: start },     // ✅ use createdAt, not date
      requiresPayment: false,
      // status: { not: "cancelled" } // <- optional, if you track cancellations
    },
  });

  const freeRemaining = count === 0; // first coaching this month is free
  return NextResponse.json({ success: true, freeRemaining });
}
