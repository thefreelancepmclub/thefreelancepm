import { z } from "zod";

// Define the form schema with Zod
export const subscriptionSchema = z.object({
  title: z.string().min(1, "Plan title is required"),
  features: z.array(z.string().min(1, "Feature cannot be empty")),
  price: z.coerce.number().positive("Price must be a positive number"),
});

// Define the form values type from the schema
export type SubscriptionCreateFormValues = z.infer<typeof subscriptionSchema>;
