import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(error);

  // Zod validation error
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  // Known application errors
  if (error instanceof Error) {
    const message = error.message;

    if (message === "Authentication required") {
      return res.status(401).json({
        success: false,
        message,
      });
    }

    if (
      message === "Invalid or expired token" ||
      message === "Invalid authorization header"
    ) {
      return res.status(401).json({
        success: false,
        message,
      });
    }

    if (
      message === "Workspace not found" ||
      message === "Note not found" ||
      message === "Task not found" ||
      message === "User not found"
    ) {
      return res.status(404).json({
        success: false,
        message,
      });
    }

    if (
      message === "Email already exists" ||
      message === "Username already exists"
    ) {
      return res.status(409).json({
        success: false,
        message,
      });
    }
  }

  // Unknown / unexpected error
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};