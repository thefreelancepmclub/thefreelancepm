/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { stripe }      from "@/lib/stripe";
import { prisma }      from "@/lib/prisma";
import { POST as webhook } from "@/app/api/stripe/webhook/route";

function toNextReq(body: Buffer, sig = "test") {
  return new NextRequest("http://localhost/api/stripe/webhook", {
    method: "POST",
    headers: { "stripe-signature": sig },
    body,
  });
}

it(
  "marks session paid on checkout.completed",
  async () => {
    /* fresh temp e-mail every run */
    const email = `tmp+${Date.now()}@test.dev`;

    /* seed temp user + session */
    const tempUser = await prisma.user.create({
      data: { name: "tmp", email, password: "x" },
    });

    const cs = await prisma.coachingSession.create({
      data: {
        userId: tempUser.id,
        sessionType: "consultation",
        tierAtCreate: "lite",
        requiresPayment: true,
        status: "opened",
      },
    });

    /* fake Stripe event */
    const payload = {
      id: "evt_test",
      type: "checkout.session.completed",
      data: { object: { metadata: { coachingId: cs.id } } },
    };
    const body = Buffer.from(JSON.stringify(payload));

    /* stub constructEvent to skip signature check */
    (stripe as any).webhooks ??= {};
    (stripe.webhooks as any).constructEvent = jest
      .fn()
      .mockReturnValue(payload as any);

    /* invoke route */
    const res = await webhook(toNextReq(body));
    expect(res.status).toBe(200);

    /* assert */
    const updated = await prisma.coachingSession.findUnique({
      where: { id: cs.id },
    });
    expect(updated?.status).toBe("paid");

    /* cleanup */
    await prisma.coachingSession.delete({ where: { id: cs.id } });
    await prisma.user.delete({ where: { id: tempUser.id } });
  },
  15_000, // ⏱ allow up to 15 s
);

afterAll(() => prisma.$disconnect());
