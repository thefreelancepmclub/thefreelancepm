import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

// Server action to calculate total earnings for the current month
export async function getTotalEarningsThisMonth() {
  try {
    // Step 1: Retrieve all active subscriptions with their stripePriceId
    const subscriptions = await prisma.subscription.findMany({
      where: {
        isActive: true,
      },
      select: {
        stripePriceId: true,
      },
    });

    if (subscriptions.length === 0) {
      console.log("No active subscriptions found.");
      return 0; // Return 0 if no subscriptions exist
    }

    // Step 2: Define the time range for the current month
    const startOfMonth = new Date();
    startOfMonth.setDate(1); // Set to the first day of the current month
    startOfMonth.setHours(0, 0, 0, 0); // Reset time to midnight

    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1); // Move to the first day of the next month
    endOfMonth.setSeconds(-1); // Set to the last second of the current month

    let totalEarnings = 0;

    // Step 3: Fetch subscriptions from Stripe for each price ID
    for (const { stripePriceId } of subscriptions) {
      try {
        // Fetch all subscriptions in Stripe that use the given price ID
        const stripeSubscriptions = await stripe.subscriptions.list({
          price: stripePriceId, // Correctly filter by price
          status: "active", // Only consider active subscriptions
        });

        // Extract subscription IDs
        const subscriptionIds = stripeSubscriptions.data.map((sub) => sub.id);

        // Step 4: Fetch invoices for these subscriptions
        for (const subscriptionId of subscriptionIds) {
          const invoices = await stripe.invoices.list({
            subscription: subscriptionId, // Filter invoices by subscription ID
            created: {
              gte: Math.floor(startOfMonth.getTime() / 1000), // Convert to Unix timestamp
              lte: Math.floor(endOfMonth.getTime() / 1000),
            },
            status: "paid", // Only consider paid invoices
          });

          // Sum up the total amount earned from these invoices
          invoices.data.forEach((invoice) => {
            totalEarnings += invoice.amount_paid / 100; // Convert cents to dollars
          });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(
          `Error fetching subscriptions for price ID ${stripePriceId}:`,
          error.message
        );
      }
    }

    console.log(`Total earnings this month: $${totalEarnings.toFixed(2)}`);
    return totalEarnings;
  } catch (error) {
    console.error("Error calculating total earnings:", error);
    throw error;
  }
}
