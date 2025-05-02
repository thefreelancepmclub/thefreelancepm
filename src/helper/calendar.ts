"use server";

import { prisma } from "@/lib/prisma";

export async function getGrantInfo() {
  const user = await prisma.user.findFirst({
    where: { role: "admin" },
  });

  if (!user) return { grantEmail: null, grantId: null };

  const { grantId, grantEmail, calendarLink } = user;

  return {
    grantId,
    grantEmail,
    calendarLink,
  };
}
