import { Router } from "express";

import { aiController } from "./ai.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.post(
  "/explain",
  authMiddleware,
  aiController.explain
);

export default router;