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
const PORT = process.env.PORT || 7000;

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

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(7000, () => {
	console.log(colors.cyan.italic.underline(`Server running on http://localhost:7000`));
});
