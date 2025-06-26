/**
 * @jest-environment node
 */
import { prisma } from "@/lib/prisma";

it(
  "creates & deletes a CoachingSession row",
  async () => {
    /* cleanup from previous runs (if any) */
    await prisma.user.deleteMany({ where: { email: "t@t.dev" } });

    const row = await prisma.coachingSession.create({
      data: {
        user: { create: { name: "Temp", email: "t@t.dev", password: "x" } },
        sessionType:     "consultation",
        tierAtCreate:    "lite",
        requiresPayment: false,
        status:          "opened",
      },
    });

    expect(row.sessionType).toBe("consultation");

    await prisma.coachingSession.delete({ where: { id: row.id } });
    await prisma.user.delete({ where: { id: row.userId } });
  },
  15_000, // ⏱ 15-second timeout so Atlas round-trip can finish
);

afterAll(async () => prisma.$disconnect());
