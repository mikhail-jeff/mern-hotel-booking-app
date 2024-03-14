import express, { Request, Response } from "express";
import cors from "cors";
import colors from "colors";
import mongoose from "mongoose";
import "dotenv/config";

import { connectDB } from "./config/db";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";

const app = express();
const PORT = process.env.PORT || 5000;

// db connection
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
	console.log(colors.cyan.italic.underline(`Server running on http://localhost:${PORT}`));
});
