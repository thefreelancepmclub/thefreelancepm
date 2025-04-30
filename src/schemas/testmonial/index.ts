import { z } from "zod";

// Zod schema for testimonial form
export const testimonialCreateSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  jobTitle: z.string().min(2, "Job title must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  rating: z.string().refine((val) => {
    const num = parseInt(val);
    return num >= 1 && num <= 5;
  }, "Rating must be between 1 and 5"),
  active: z.boolean(),
});

export type TestimonialCreateType = z.infer<typeof testimonialCreateSchema>;
