import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dashboardRoutes from "./modules/dashboard/dashboard.routes";
import authRoutes from "./modules/auth/auth.routes";

import { notFoundHandler } from "./middleware/not-found.middleware";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

/**
 * Global Middlewares
 */
app.use(cors());

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(compression());

app.use(morgan("dev"));

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/**
 * Health Check
 */
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Nexora API is running",
  });
});

/**
 * API Routes
 */
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

/**
 * 404 Handler
 */
app.use(notFoundHandler);

/**
 * Global Error Handler
 */
app.use(errorHandler);


export default app;