// tests/booking/logic.test.ts
import { needsDateTime, requiresPayment } from "@/lib/booking/logic";

const table = [
  // session, tier, freeRemaining, isLegacy, needsDate, pay$
  ["consultation", "lite",  false, false, false, false],
  ["coaching",     "lite",  false, false, true,  true ],
  ["coaching",     "elite", true,  false, false, false],
  ["coaching",     "elite", false, false, true,  true ],
  ["coaching",     "free",  false, true,  true,  false],
] as const;

describe("booking business rules", () => {
  it.each(table)(
    "%s | %s | free=%p | legacy=%p",
    (sess, tier, free, legacy, expectDate, expectPay) => {
      expect(needsDateTime(tier as any, sess as any, free)).toBe(expectDate);
      expect(
        requiresPayment(tier as any, sess as any, free, legacy),
      ).toBe(expectPay);
    },
  );
});
