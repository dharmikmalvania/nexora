import { Router } from "express";
import { taskController } from "./task.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.post(
  "/workspaces/:workspaceId/tasks",
  authMiddleware,
  taskController.create
);

router.get(
  "/workspaces/:workspaceId/tasks",
  authMiddleware,
  taskController.getAll
);

router.get(
  "/tasks/:id",
  authMiddleware,
  taskController.getById
);

router.patch(
  "/tasks/:id",
  authMiddleware,
  taskController.update
);

router.delete(
  "/tasks/:id",
  authMiddleware,
  taskController.delete
);

export default router;