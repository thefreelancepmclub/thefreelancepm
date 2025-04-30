import { z } from "zod";

// Define the form schema with Zod
export const courseCreateSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  instructor: z.string().min(1, { message: "Instructor is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  file: z.string().min(1, { message: "File is required" }),
  plan: z.string().min(1, { message: "Plan is required" }),
  publishNow: z.boolean().default(false).optional(),
});

export type CourseCreateType = z.infer<typeof courseCreateSchema>;
