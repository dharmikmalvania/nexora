import { Request, Response, NextFunction } from "express";
import { workspaceService } from "./workspace.service";
import {
  createWorkspaceSchema,
  updateWorkspaceSchema,
} from "./workspace.validation";
import { successResponse } from "../../lib/api-response";
import { AuthenticatedRequest } from "../../middleware/auth.middleware";

class WorkspaceController {
  public create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const body = createWorkspaceSchema.parse(req.body);
      const authenticatedReq = req as AuthenticatedRequest;

      const workspace =
        await workspaceService.create(
          authenticatedReq.user.id,
          body
        );

      return res.status(201).json(
        successResponse(
          "Workspace created successfully",
          workspace
        )
      );
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authenticatedReq = req as AuthenticatedRequest;

      const workspaces =
        await workspaceService.getAll(authenticatedReq.user.id);

      return res.status(200).json(
        successResponse(
          "Workspaces retrieved successfully",
          workspaces
        )
      );
    } catch (error) {
      next(error);
    }
  };

  public getById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authenticatedReq = req as AuthenticatedRequest;
      const id = Number(req.params.id);

      if (Number.isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid workspace ID",
        });
      }

      const workspace =
        await workspaceService.getById(
          authenticatedReq.user.id,
          id
        );

      return res.status(200).json(
        successResponse(
          "Workspace retrieved successfully",
          workspace
        )
      );
    } catch (error) {
      next(error);
    }
  };

  public update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authenticatedReq = req as AuthenticatedRequest;
      const id = Number(req.params.id);

      if (Number.isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid workspace ID",
        });
      }

      const body = updateWorkspaceSchema.parse(req.body);

      const workspace =
        await workspaceService.update(
          authenticatedReq.user.id,
          id,
          body
        );

      return res.status(200).json(
        successResponse(
          "Workspace updated successfully",
          workspace
        )
      );
    } catch (error) {
      next(error);
    }
  };

  public delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authenticatedReq = req as AuthenticatedRequest;
      const id = Number(req.params.id);

      if (Number.isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid workspace ID",
        });
      }

      await workspaceService.delete(
        authenticatedReq.user.id,
        id
      );

      return res.status(200).json(
        successResponse(
          "Workspace deleted successfully",
          null
        )
      );
    } catch (error) {
      next(error);
    }
  };
}

export const workspaceController =
  new WorkspaceController();