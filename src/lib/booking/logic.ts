// src/lib/booking/logic.ts
export type Tier = "free" | "lite" | "pro" | "elite";
export type SessionType = "consultation" | "coaching";

/**
 * Do we need the user to choose a Calendly slot
 * before we can continue (i.e. show date + time pickers)?
 */
export const needsDateTime = (
  tier: Tier,
  sessionType: SessionType,
  freeRemaining: boolean,
  isLegacyFree: boolean,
): boolean => {
  if (sessionType === "consultation") return false;
  
    /* Free tier — first coaching ever is a free intro (no slot pickers) */
    if (tier === "free")  return !isLegacyFree;
  
    /* Elite — first coaching this calendar month is free (no slot) */
    if (tier === "elite") return !freeRemaining;
  
    /* Lite / Pro always pick a date + time */
    return true;
};

/**
 * Does this booking route through Stripe Checkout?
 */
export const requiresPayment = (
  tier: Tier,
  sessionType: SessionType,
  freeRemaining: boolean,
  isLegacyFree: boolean,
): boolean => {
  if (sessionType === "consultation") return false;
  if (isLegacyFree) return false;                  // grandfathered users
  if (tier === "elite") return !freeRemaining;
  return true;                                     // lite | pro | new-free
};
