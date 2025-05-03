import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return user;
}
export async function getUserById(id: string) {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  return user;
}

export async function getUserSubscription() {
  const cu = await auth();
  const now = new Date();

  if (!cu) return null;

  const userSubscription = await prisma.userSubscription.findFirst({
    where: {
      userId: cu.user.id,
    },
    include: {
      subscription: {
        select: {
          id: true,
          title: true,
        },
      },
      features: true,
    },
  });

  if (!userSubscription) return null;

  const isExpired = userSubscription.endDate && userSubscription.endDate < now;

  return {
    status: userSubscription.status,
    isExpired,
    endDate: userSubscription.endDate,
    subscriptionTitle: userSubscription.subscription?.title,
    subscriptionId: userSubscription.subscription?.id,
    features: userSubscription.features,
  };
}

export type CurrentSubscription = Awaited<
  ReturnType<typeof getUserSubscription>
>;
