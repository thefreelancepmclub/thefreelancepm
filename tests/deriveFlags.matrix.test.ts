import { deriveFlags } from "@/lib/booking/validate";

/*
 * Cols: tier | session | freeRemaining | isLegacyFree | needsSlot | pay
 */
const cases: Array<[ "free"|"lite"|"pro"|"elite",
                     "consultation"|"coaching",
                     boolean, boolean, boolean, boolean]> = [
  //        tier   session         free?  legacy  pick?  pay?
  /* F */ ["free",  "consultation", false, false, false, false],
  /* G */ ["free",  "coaching",     false, true,  false, false], // first-ever
  /* H */ ["free",  "coaching",     false, false, true,  true ], // follow-up

  /* L */ ["lite",  "coaching",     false, false, true,  true ],
  /* P */ ["pro",   "coaching",     false, false, true,  true ],

  /* E1 */["elite", "coaching",     true,  false, false, false], // first this month
  /* E2 */["elite", "coaching",     false, false, true,  true ], // second this month
];

describe("deriveFlags() matrix", () => {
  it.each(cases)(
    "tier %s – %s ⇒ needsSlot=%s pay=%s",
    (tier, session, freeLeft, legacy, slot, pay) => {
      const flags = deriveFlags(
        { sessionType: session, firstName:"a", lastName:"b", email:"x@y.z" },
        { tier, freeRemaining: freeLeft, isLegacyFree: legacy },
      );
      expect(flags.needsSlot).toBe(slot);
      expect(flags.pay).toBe(pay);
    },
  );
});
