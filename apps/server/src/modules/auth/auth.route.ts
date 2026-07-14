import { Router } from "express";

const router = Router();

router.post("/register", (_req, res) => {
  res.json({
    success: true,
    message: "Register route working 🚀",
  });
});

export default router;