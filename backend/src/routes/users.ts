import express, { Response, Request } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

// current logged-in user
router.get("/me", verifyToken, async (req: Request, res: Response) => {
	const userId = req.userId;

	try {
		const user = await User.findById(userId).select("-password");

		if (!user) {
			return res.status(400).json({ message: "User not found" });
		}

		res.json(user);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Something went wrong" });
	}
});

// register user
router.post(
	"/register",
	[
		check("firstName", "first name is required").notEmpty().isString(),
		check("lastName", "last name is required").notEmpty().isString(),
		check("email", "email is required").notEmpty().isEmail(),
		check("password", "password should not be empty and should be at least 5 character").notEmpty().isLength({ min: 5 }),
	],
	async (req: Request, res: Response) => {
		// express-validator
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ message: errors.array() });
		}

		try {
			let user = await User.findOne({
				email: req.body.email,
			});

			if (user) {
				return res.status(400).json({ message: "User already exists" });
			}

			user = new User(req.body);
			await user.save();

			// create access token
			const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, {
				expiresIn: "1d",
			});

			res.cookie("auth_token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				maxAge: 86400000, // 1 day in milliseconds
			});

			return res.status(200).send({ message: "user registered" });
		} catch (error) {
			console.log(error);
			res.status(500).send({ message: "Something went wrong" });
		}
	}
);

export default router;
