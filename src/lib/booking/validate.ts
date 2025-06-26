import { z } from "zod";
import { needsDateTime, requiresPayment } from "./logic";

export const bookingSchema = z.object({
  sessionType: z.enum(["consultation", "coaching"]),
  firstName:   z.string().min(1),
  lastName:    z.string().min(1),
  email:       z.string().email(),
  phone:       z.string().optional(),
  dateTime:    z.date().optional(),
});

/**
 * Derive the two flags once so both API & client stay in sync.
 */
export function deriveFlags(input: z.infer<typeof bookingSchema>, ctx: {
  tier: "free" | "lite" | "pro" | "elite";
  freeRemaining: boolean;
  isLegacyFree: boolean;
}) {
  const needsSlot = needsDateTime(ctx.tier, input.sessionType, ctx.freeRemaining, ctx.isLegacyFree);
  const pay       = requiresPayment(ctx.tier, input.sessionType, ctx.freeRemaining, ctx.isLegacyFree);
  return { needsSlot, pay };
}
