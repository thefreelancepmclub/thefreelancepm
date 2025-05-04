// handlers/template.ts
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function handleCourseDownload(session: Stripe.Checkout.Session) {
  const purchaseId = session.metadata?.purchaseId;

  if (!purchaseId) {
    throw new Error("Missing metadata fields for template checkout");
  }

  const data = await prisma.userPurchasedCourse.update({
    where: { id: purchaseId },
    data: {
      isPaid: true,
      purchasedAt: new Date(),
    },
  });

  await prisma.course.update({
    where: { id: data.courseId },
    data: {
      enrolled: {
        increment: 1,
      },
    },
  });
}
