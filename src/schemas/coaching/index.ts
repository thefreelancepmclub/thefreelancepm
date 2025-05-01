import { z } from "zod";

export const coachingSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phoneNumber: z.string(),
  date: z.date({ required_error: "Please select a date" }),
  time: z.string({ required_error: "Please select a time" }),
  focusAreas: z.array(z.string()).refine((value) => value.length >= 1, {
    message: "Please select at least one focus area",
  }),
  notes: z.string().optional(),
});

export type CoachingSchemaType = z.infer<typeof coachingSchema>;
