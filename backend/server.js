// server.js
// Entry point for the Express backend. Sets up middleware, routes, DB connection,
// basic logging, CORS and error handling. Exports the app (helpful for tests).

import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import "express-async-errors"; // handle async errors without try/catch
import scheduleRoutes from "./routes/scheduleRoutes.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import itemRoutes from "./routes/items.js";
import enrollRoutes from "./routes/enroll.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// CORS - allow frontend at http://localhost:3000
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/enroll", enrollRoutes);
app.use("/api/schedules", scheduleRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// 404 + error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

export default app;
