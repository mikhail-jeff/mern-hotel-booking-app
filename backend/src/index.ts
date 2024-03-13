import express, { Request, Response } from "express";
import cors from "cors";
import colors from "colors";
import mongoose from "mongoose";
import "dotenv/config";
import { connectDB } from "../config/db";

const app = express();
const PORT = process.env.PORT || 7000;

// db connection
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/test", async (req: Request, res: Response) => {
	res.json({ message: `Hello from express endpoint` });
});

app.listen(PORT, () => {
	console.log(colors.cyan.italic.underline(`Server running on http://localhost:${PORT}`));
});
