import { Router } from "express";
import { workspaceController } from "./workspace.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  workspaceController.create
);

router.get(
  "/",
  authMiddleware,
  workspaceController.getAll
);

router.get(
  "/:id",
  authMiddleware,
  workspaceController.getById
);

router.patch(
  "/:id",
  authMiddleware,
  workspaceController.update
);

router.delete(
  "/:id",
  authMiddleware,
  workspaceController.delete
);

export default router;