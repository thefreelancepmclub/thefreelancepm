// tests/templateDownload.free.spec.ts
import { PrismaClient } from "@prisma/client";
import { mockDeep }     from "jest-mock-extended";
import { templateDownload } from "../src/action/templates/downloadReq";

// ─── stub Prisma ────────────────────────────────────────────────────────
jest.mock("@/lib/prisma", () => {
  const { mockDeep } = require("jest-mock-extended");
  const prisma = mockDeep<PrismaClient>();      // built inside factory
  return { __esModule: true, prisma };
});

// other mocks
jest.mock("@/auth", () => ({ auth: jest.fn() }));
jest.mock("@/helper/subscription", () => ({ getCurrentSubscription: jest.fn() }));

// ─── test ───────────────────────────────────────────────────────────────
test("free template downloads without feature row", async () => {
  const { auth } = require("@/auth");
  auth.mockResolvedValue({ user: { id: "u1" } });

  const { getCurrentSubscription } = require("@/helper/subscription");
  getCurrentSubscription.mockResolvedValue({
    tier: "free",
    getFeature: () => null,
  });

  const { prisma } = require("@/lib/prisma");
  prisma.template.findFirst.mockResolvedValue({
    id: "t1",
    category: "free",
    file: "https://edge/file.pdf",
  });

  const res = await templateDownload("t1");
  expect(res).toMatchObject({ success: true, file: /file\.pdf$/ });
});
