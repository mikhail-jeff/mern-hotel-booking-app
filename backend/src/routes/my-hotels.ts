import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel from "../models/hotel";
import { HotelType } from "../shared/types";
import { verifyToken } from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 5 * 1024 * 1024, // 5MB
	},
});

// create hotel
router.post(
	"/",
	verifyToken,
	[
		body("name").notEmpty().withMessage("Name is required"),
		body("city").notEmpty().withMessage("City is required"),
		body("country").notEmpty().withMessage("Country is required"),
		body("description").notEmpty().withMessage("Description is required"),
		body("type").notEmpty().withMessage("Hotel type is required"),
		body("adultCount").notEmpty().isNumeric().withMessage("Adult count is required and must be a number"),
		body("childCount").notEmpty().isNumeric().withMessage("Child count is required and must be a number"),
		body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night is required and must be a number"),
		body("starRate").notEmpty().isNumeric().withMessage("Star rate is required and must be a number"),
		body("facilities").notEmpty().isArray().withMessage("Facilities are required"),
	],
	upload.array("imageFiles", 6),
	async (req: Request, res: Response) => {
		try {
			const imageFiles = req.files as Express.Multer.File[];
			const newHotel: HotelType = req.body;

			// Upload images to cloudinary
			// const uploadPromises = imageFiles.map(async (image) => {
			// 	const b64 = Buffer.from(image.buffer).toString("base64");
			// 	let dataURI = "data:" + image.mimetype + ";base64," + b64;

			// 	const response = await cloudinary.v2.uploader.upload(dataURI);

			// 	return response.url;
			// });

			// const imageUrls = await Promise.all(uploadPromises);

			// Upload images to cloudinary
			const imageUrls = await uploadImages(imageFiles);

			// Assign image URLs to the new hotel
			newHotel.imageUrls = imageUrls;
			newHotel.lastUpdated = new Date();
			newHotel.userId = req.userId;

			// Save hotel to the database
			const hotel = new Hotel(newHotel);
			await hotel.save();

			// Send response
			res.status(201).send(hotel);
		} catch (error) {
			console.log(`Error creating hotel: ${error}`);
			res.status(500).json({ message: "Something went wrong" });
		}
	}
);

// get all hotels
router.get("/", verifyToken, async (req: Request, res: Response) => {
	try {
		const hotels = await Hotel.find({ userId: req.userId });

		res.json(hotels);
	} catch (error) {
		res.status(500).json({ message: "Error fetching hotels" });
	}
});

//get hotel by id
router.get("/:id", verifyToken, async (req: Request, res: Response) => {
	const id = req.params.id.toString();

	try {
		const hotel = await Hotel.findOne({
			_id: id,
			userId: req.userId,
		});

		res.json(hotel);
	} catch (error) {
		res.status(500).json({ message: "Error fetching hotel" });
	}
});

// edit hotel
router.put("/:id", verifyToken, upload.array("imageFiles"), async (req: Request, res: Response) => {
	try {
		const updatedHotel: HotelType = req.body;

		updatedHotel.lastUpdated = new Date();

		const hotel = await Hotel.findByIdAndUpdate(
			{
				_id: req.params.id,
				userId: req.userId,
			},
			updatedHotel,
			{
				new: true,
			}
		);

		if (!hotel) {
			return res.status(404).json({ message: "Hotel Not Found" });
		}

		const files = req.files as Express.Multer.File[];

		// Upload images to cloudinary
		const updatedImageUrls = await uploadImages(files);

		hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])];

		await hotel.save();

		res.status(201).json(hotel);
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
});

// delete hotel
router.delete("/:id", verifyToken, async (req: Request, res: Response) => {
	const id = req.params.id.toString();

	try {
		// Find the hotel by ID and the user ID to ensure the user has permission to delete it
		const hotel = await Hotel.findOneAndDelete({
			_id: id,
			userId: req.userId,
		});

		if (!hotel) {
			return res.status(404).json({ message: "Hotel not found" });
		}

		res.json({ message: "Hotel deleted successfully" });
	} catch (error) {
		console.error(`Error deleting hotel: ${error}`);
		res.status(500).json({ message: "Error deleting hotel" });
	}
});

// *** upload image function
async function uploadImages(imageFiles: Express.Multer.File[]) {
	const uploadPromises = imageFiles.map(async (image) => {
		const b64 = Buffer.from(image.buffer).toString("base64");
		let dataURI = "data:" + image.mimetype + ";base64," + b64;

		const response = await cloudinary.v2.uploader.upload(dataURI);

		return response.url;
	});

	const imageUrls = await Promise.all(uploadPromises);
	return imageUrls;
}

export default router;
