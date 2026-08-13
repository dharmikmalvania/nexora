import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../middleware/auth.middleware";
import { taskService } from "./task.service";
import {
  createTaskSchema,
  updateTaskSchema,
} from "./task.validation";
import { successResponse } from "../../lib/api-response";

class TaskController {
  public create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authenticatedReq = req as AuthenticatedRequest;
      const workspaceId = Number(
        req.params.workspaceId
      );

      if (Number.isNaN(workspaceId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid workspace ID",
        });
      }

      const body = createTaskSchema.parse(req.body);

      const task = await taskService.create(
        authenticatedReq.user.id,
        workspaceId,
        body
      );

      return res.status(201).json(
        successResponse(
          "Task created successfully",
          task
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
      const workspaceId = Number(
        req.params.workspaceId
      );

      if (Number.isNaN(workspaceId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid workspace ID",
        });
      }

      const tasks = await taskService.getAll(
        authenticatedReq.user.id,
        workspaceId
      );

      return res.status(200).json(
        successResponse(
          "Tasks retrieved successfully",
          tasks
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
          message: "Invalid task ID",
        });
      }

      const task = await taskService.getById(
        authenticatedReq.user.id,
        id
      );

      return res.status(200).json(
        successResponse(
          "Task retrieved successfully",
          task
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
          message: "Invalid task ID",
        });
      }

      const body = updateTaskSchema.parse(req.body);

      const task = await taskService.update(
        authenticatedReq.user.id,
        id,
        body
      );

      return res.status(200).json(
        successResponse(
          "Task updated successfully",
          task
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
          message: "Invalid task ID",
        });
      }

      await taskService.delete(
        authenticatedReq.user.id,
        id
      );

      return res.status(200).json(
        successResponse(
          "Task deleted successfully",
          null
        )
      );
    } catch (error) {
      next(error);
    }
  };
}

export const taskController =
  new TaskController();