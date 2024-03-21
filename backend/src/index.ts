import express, { Request, Response } from "express";
import cors from "cors";
import colors from "colors";
import mongoose from "mongoose";
import "dotenv/config";
import cookieParser from "cookie-parser";
import path from "path";

import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";

const app = express();

// db connection
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
	})
);

app.use(express.static(path.join(__dirname, "../../backend/dist")));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(7000, () => {
	console.log(colors.cyan.italic.underline(`Server running on localhost:7000`));
});
