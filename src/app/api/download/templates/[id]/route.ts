import { auth } from "@/auth";
import { getCurrentSubscription } from "@/helper/subscription";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const cu = await auth();

  if (!cu) {
    return Response.json(
      {
        success: false,
        message: "You are not logged in",
      },
      { status: 401 },
    );
  }
  const currentSubscription = await getCurrentSubscription(
    cu.user.id as string,
  );

  if (!currentSubscription) {
    return Response.json(
      {
        success: false,
        message: "You don't have a subscription",
      },
      { status: 403 },
    );
  }

  const template = await prisma.template.findFirst({
    where: {
      id: params.id,
    },
  });

  if (!template) {
    return Response.json(
      {
        success: false,
        message: "Template not found",
      },
      { status: 404 },
    );
  }

  const isFreeTemplate = template.category === "free";
  const isFreeUser = currentSubscription.tier === "free";

  if (isFreeTemplate && isFreeUser) {
    // Return file download link or stream file
    // Example: send file URL or stream response
    return Response.json(
      {
        success: true,
        message: "File download Link",
        file: template.file,
      },
      {
        status: 200,
      },
    );
  }
}
