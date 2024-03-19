import express, { Request, Response, NextFunction } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

// login user
router.post("/login", [check("email", "email is required").notEmpty().isEmail(), check("password", "password should be at least 5 character").notEmpty().isLength({ min: 5 })], async (req: Request, res: Response) => {
	// express-validator
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ message: errors.array() });
	}

	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ message: "Invalid Credentials" });
		}

		//check if password match
		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({ message: "Invalid Credentials" });
		}

		// create access token
		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, {
			expiresIn: "1d",
		});

		res.cookie("auth_token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 86400000,
		});

		res.status(200).json({
			userId: user._id,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Something went wrong" });
	}
});

//logout
router.post("/logout", (req: Request, res: Response) => {
	res.cookie("auth_token", "", {
		expires: new Date(0),
	});

	res.send();
});

// validate token
router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
	res.status(200).send({ userId: req.userId });
});

export default router;
