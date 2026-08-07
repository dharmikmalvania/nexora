import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service";
import { registerSchema } from "./auth.validation";
import { successResponse } from "../../lib/api-response";

class AuthController {
  public register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Validate request body
      const body = registerSchema.parse(req.body);
      console.log("Parsed Body:", body);

      // Call service
      const user = await authService.register(body);

      // Send success response
      return res.status(201).json(
        successResponse("User registered successfully", user)
      );
    } catch (error) {
      next(error);
    }
  };
}

export const authController = new AuthController();