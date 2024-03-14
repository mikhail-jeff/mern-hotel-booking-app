import mongoose from "mongoose";
import colors from "colors";

export const connectDB = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
		console.log(colors.cyan.italic.underline(`MongoDB connected: ${connect.connection.host}`));
	} catch (error) {
		console.log(colors.red.italic.underline(error as string));
	}
};
