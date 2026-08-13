import { z } from "zod";

export const explainSchema = z.object({
  topic: z
    .string()
    .min(2, "Topic must be at least 2 characters")
    .max(500, "Topic cannot exceed 500 characters"),
});

export type ExplainInput = z.infer<typeof explainSchema>;