import { PrismaClient } from "@prisma/client";
import { mockDeep }     from "jest-mock-extended";
import { templateDownload } from "../src/action/templates/downloadReq";

// deep-mock Prisma
jest.mock("@/lib/prisma", () => {
  const { mockDeep } = require("jest-mock-extended");
  return { __esModule: true, prisma: mockDeep<PrismaClient>() };
});
jest.mock("@/auth", () => ({ auth: jest.fn() }));
jest.mock("@/helper/subscription", () => ({ getCurrentSubscription: jest.fn() }));
// Stripe is already mocked globally in your Jest setup

test("blocks pro template when quota exhausted → redirects to Stripe", async () => {
  /* ─── arrange ───────────────────────────────────────── */
  const { auth } = require("@/auth");
  auth.mockResolvedValue({ user: { id: "u42" } });

  const { getCurrentSubscription } = require("@/helper/subscription");
  getCurrentSubscription.mockResolvedValue({
    tier: "pro",
    getFeature: () => ({ remaining: 0, value: 0 }),
  });

  const { prisma } = require("@/lib/prisma");
  prisma.template.findFirst.mockResolvedValue({
    id: "tPro",
    category: "pro",
    price: 10,
    file: "https://edge/pro.pdf",
  });
  prisma.userPurchasedTemplate.create.mockResolvedValue({ id: "p1" });

  /* ─── act ───────────────────────────────────────────── */
  const res = await templateDownload("tPro");

   expect(res).toMatchObject({
       success: true,
       url: expect.stringContaining("http"),
     });
});
