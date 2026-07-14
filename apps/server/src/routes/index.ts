import { Router } from "express";
import v1Routes from "./v!.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    name: "Nexora API",
    version: "1.0.0",
  });
});

router.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "Server is healthy 🚀",
  });
});

router.use("/v1", v1Routes);

export default router;