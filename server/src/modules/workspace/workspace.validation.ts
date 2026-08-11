import { z } from "zod";

const categories = [
  "Study",
  "Placement",
  "Project",
  "Personal",
  "Research",
] as const;

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .min(3, "Workspace name must be at least 3 characters")
    .max(100, "Workspace name cannot exceed 100 characters"),

  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),

  goal: z
    .string()
    .max(255, "Goal cannot exceed 255 characters")
    .optional(),

  icon: z
    .string()
    .max(50)
    .optional(),

  color: z
    .string()
    .max(20)
    .optional(),

  category: z.enum(categories),
});

export const updateWorkspaceSchema =
  createWorkspaceSchema.partial();

export type CreateWorkspaceInput = z.infer<
  typeof createWorkspaceSchema
>;

export type UpdateWorkspaceInput = z.infer<
  typeof updateWorkspaceSchema
>;