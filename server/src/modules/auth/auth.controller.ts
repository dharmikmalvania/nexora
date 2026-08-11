import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service";
import {
  registerSchema,
  loginSchema,
} from "./auth.validation";
import { successResponse } from "../../lib/api-response";
import { AuthenticatedRequest } from "../../middleware/auth.middleware";
import { userRepository } from "../../repositories/user.repository";

class AuthController {
  public register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const body = registerSchema.parse(req.body);

      const user = await authService.register(body);

      return res.status(201).json(
        successResponse(
          "User registered successfully",
          user
        )
      );
    } catch (error) {
      next(error);
    }
  };

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const body = loginSchema.parse(req.body);

      const result = await authService.login(
        body.email,
        body.password
      );

      return res.status(200).json(
        successResponse(
          "Login successful",
          result
        )
      );
    } catch (error) {
      next(error);
    }
  };

  public me = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authenticatedReq = req as AuthenticatedRequest;

      const user = await userRepository.findById(
        authenticatedReq.user.id
      );

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json(
        successResponse(
          "Current user retrieved successfully",
          {
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            isAdmin: user.isAdmin,
            createdAt: user.createdAt,
          }
        )
      );
    } catch (error) {
      next(error);
    }
  };
}

export const authController = new AuthController();