// CommonJS syntax
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const plans = [
    {
      title: "Freelancer Lite", // keep as-is
      price: 0,
      features: [
        "Access free templates",
        "Basic course library",
        "Community access",
      ],
      paymentLink: "N/A",
      stripeProductId: "free-lite",
      stripePriceId: "free-lite",
    },
    {
      title: "Freelancer Pro", // must match production exactly
      price: 1000, // optional; will be skipped if not found
      features: [
        "Everything in Lite",
        "Premium templates",
        "Full course access",
        "Resume reviews",
      ],
      paymentLink: "https://stripe.com/pay-link-pro",
      stripeProductId: "prod_pro_123",
      stripePriceId: "price_pro_123",
    },
    {
      title: "Freelancer Elite", // must match production exactly
      price: 2000,
      features: [
        "Everything in Freelancer Pro",
        "1-on-1 coaching",
        "VIP Slack Access",
        "Unlimited resume reviews",
      ],
      paymentLink: "https://stripe.com/pay-link-elite",
      stripeProductId: "prod_elite_456",
      stripePriceId: "price_elite_456",
    },
  ];

  for (const plan of plans) {
    const existing = await prisma.subscription.findUnique({
      where: { title: plan.title },
    });

    if (existing) {
      await prisma.subscription.update({
        where: { title: plan.title },
        data: {
          price: plan.price,
          features: plan.features,
          paymentLink: plan.paymentLink,
          stripeProductId: plan.stripeProductId,
          stripePriceId: plan.stripePriceId,
        },
      });
      console.log(`✅ Updated plan: ${plan.title}`);
    } else {
      await prisma.subscription.create({ data: plan });
      console.log(`✅ Created missing plan: ${plan.title}`);    }
  }
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
