import { ExperiencesType, JobType } from "@prisma/client";
import { z } from "zod";

const jobTypeEnumValues = Object.values(JobType);
// Create a schema for job creation/editing
export const jobFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Job title must be at least 3 characters" }),
  company: z.string().min(2, { message: "Company name is required" }),
  type: z.enum(jobTypeEnumValues as [string, ...string[]]),
  location: z.string().min(2, { message: "Location is required" }),
  salary: z.coerce.number().optional(),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  url: z.string().url({ message: "Please enter a valid URL" }),
  expiration: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please enter a valid date",
  }),
  skills: z.string(),
  experienc: z.enum(Object.values(ExperiencesType) as [string, ...string[]]),
  education: z.string().min(2, { message: "Education is required" }),
  published: z.boolean(),
});

export type JobFormSchemaType = z.infer<typeof jobFormSchema>;
