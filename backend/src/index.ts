import express, { Request, Response } from "express";
import cors from "cors";
import colors from "colors";
import mongoose from "mongoose";
import "dotenv/config";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";

const app = express();
const PORT = process.env.PORT || 7000;

// db connection
connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
	})
);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
	console.log(colors.cyan.italic.underline(`Server running on http://localhost:${PORT}`));
});
