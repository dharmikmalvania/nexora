import { Router } from "express";
import { noteController } from "./note.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.post(
  "/workspaces/:workspaceId/notes",
  authMiddleware,
  noteController.create
);

router.get(
  "/workspaces/:workspaceId/notes",
  authMiddleware,
  noteController.getAll
);

router.get(
  "/notes/:id",
  authMiddleware,
  noteController.getById
);

router.patch(
  "/notes/:id",
  authMiddleware,
  noteController.update
);

router.delete(
  "/notes/:id",
  authMiddleware,
  noteController.delete
);

export default router;