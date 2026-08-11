import { z } from "zod";

export const createNoteSchema = z.object({
  title: z
    .string()
    .min(1, "Note title is required")
    .max(200),

  content: z
    .string()
    .min(1, "Note content is required"),

  isPinned: z
    .boolean()
    .optional(),
});

export const updateNoteSchema =
  createNoteSchema.partial();

export type CreateNoteInput =
  z.infer<typeof createNoteSchema>;

export type UpdateNoteInput =
  z.infer<typeof updateNoteSchema>;