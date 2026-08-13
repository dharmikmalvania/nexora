import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Task title is required")
    .max(200, "Task title cannot exceed 200 characters"),

  description: z
    .string()
    .max(2000, "Description cannot exceed 2000 characters")
    .optional(),

  status: z
    .enum([
      "TODO",
      "IN_PROGRESS",
      "COMPLETED",
    ])
    .optional(),

  priority: z
    .enum([
      "LOW",
      "MEDIUM",
      "HIGH",
    ])
    .optional(),

  dueDate: z
    .string()
    .datetime()
    .optional(),
});

export const updateTaskSchema =
  createTaskSchema.partial();

export type CreateTaskInput =
  z.infer<typeof createTaskSchema>;

export type UpdateTaskInput =
  z.infer<typeof updateTaskSchema>;