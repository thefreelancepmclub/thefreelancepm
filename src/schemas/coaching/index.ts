import { z } from "zod";
import { DateTime } from "luxon";

export const coachingSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phoneNumber: z.string(),
    // Accept "2025-07-04"  **or** Date  → always output a Date
    date: z.preprocess(
      (val) =>
        typeof val === "string"
          ? DateTime.fromISO(val).toJSDate()   // or new Date(val)
          : val,
      z.date().optional(),
    ),
  time: z.string().optional(),
  focusAreas: z
    .array(z.string())
    .refine((value) => value.length >= 1, {
      message: "Please select at least one focus area",
    }),
  notes: z.string().optional(),

  /** NEW: distinguishes free consultation vs. paid coaching */
  sessionType: z.enum(["consultation", "coaching"]),
});

/** 👇 unified type used by BOTH react-hook-form and resolver */
export type CoachingSchema = z.infer<typeof coachingSchema>;

/* optional: keep old alias until all imports refactored */
export type CoachingSchemaType = CoachingSchema;
