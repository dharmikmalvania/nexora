import { Request, Response, NextFunction } from "express";
import { dashboardService } from "./dashboard.service";
import { successResponse } from "../../lib/api-response";

class DashboardController {
  public getDashboard = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Temporary user
      // Later this will come from JWT middleware
      const user = {
        id: 1,
        fullName: "Dharmik Malvaniya",
        username: "dharmik",
        email: "dharmik@gmail.com",
      };

      const dashboard = await dashboardService.getDashboard(user);

      return res.status(200).json(
        successResponse(
          "Dashboard loaded successfully",
          dashboard
        )
      );
    } catch (error) {
      next(error);
    }
  };
}

export const dashboardController = new DashboardController();