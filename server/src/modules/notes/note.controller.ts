import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../middleware/auth.middleware";
import { noteService } from "./note.service";
import {
  createNoteSchema,
  updateNoteSchema,
} from "./note.validation";
import { successResponse } from "../../lib/api-response";

class NoteController {
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

      const body = createNoteSchema.parse(req.body);

      const note = await noteService.create(
        authenticatedReq.user.id,
        workspaceId,
        body
      );

      return res.status(201).json(
        successResponse(
          "Note created successfully",
          note
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

      const notes = await noteService.getAll(
        authenticatedReq.user.id,
        workspaceId
      );

      return res.status(200).json(
        successResponse(
          "Notes retrieved successfully",
          notes
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
          message: "Invalid note ID",
        });
      }

      const note = await noteService.getById(
        authenticatedReq.user.id,
        id
      );

      return res.status(200).json(
        successResponse(
          "Note retrieved successfully",
          note
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
          message: "Invalid note ID",
        });
      }

      const body = updateNoteSchema.parse(req.body);

      const note = await noteService.update(
        authenticatedReq.user.id,
        id,
        body
      );

      return res.status(200).json(
        successResponse(
          "Note updated successfully",
          note
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
          message: "Invalid note ID",
        });
      }

      await noteService.delete(
        authenticatedReq.user.id,
        id
      );

      return res.status(200).json(
        successResponse(
          "Note deleted successfully",
          null
        )
      );
    } catch (error) {
      next(error);
    }
  };
}

export const noteController =
  new NoteController();