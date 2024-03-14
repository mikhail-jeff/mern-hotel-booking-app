import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

interface UserType extends Document {
	_id: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

const userSchema = new mongoose.Schema<UserType>({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
});

// hashing password
userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 10);
	}

	next();
});

const User: Model<UserType> = mongoose.model<UserType>("User", userSchema);

export default User;
