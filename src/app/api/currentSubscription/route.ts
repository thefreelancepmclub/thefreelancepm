import { auth } from "@/auth";
import { getCurrentSubscription } from "@/helper/subscription";

export async function GET() {
  const cu = await auth();

  if (!cu?.user.id) {
    return Response.json(
      {
        success: false,
        message: "Unauthorized access",
      },
      {
        status: 403,
      },
    );
  }

  try {
    const subscription = await getCurrentSubscription(cu.user.id);
    return Response.json({
      success: true,
      message: "Data retrived successfully",
      data: subscription,
    });
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to fetch subscription",
      },
      {
        status: 500,
      },
    );
  }
}
