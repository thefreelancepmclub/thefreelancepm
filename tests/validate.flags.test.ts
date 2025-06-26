import { deriveFlags } from "@/lib/booking/validate";

it("elite first-of-month is free", () => {
  const flags = deriveFlags(
    { sessionType: "coaching", firstName:"a", lastName:"b", email:"x@y.z" },
    { tier:"elite", freeRemaining:true, isLegacyFree:false },
  );
  expect(flags.needsSlot).toBe(false);
  expect(flags.pay).toBe(false);
});
