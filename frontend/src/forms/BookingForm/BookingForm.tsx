import { useForm } from "react-hook-form";
import { UserType } from "../../../../backend/src/shared/types";

type Props = {
	currentUser: UserType;
};

type BookingFormData = {
	firstName: string;
	lastName: string;
	email: string;
};

const BookingForm = ({ currentUser }: Props) => {
	const { handleSubmit, register } = useForm<BookingFormData>({
		defaultValues: {
			firstName: currentUser.firstName,
			lastName: currentUser.lastName,
			email: currentUser.email,
		},
	});

	return (
		<form className="grid grid-cols-1 gap-4 rounded-md border border-slate-300 p-5 shadow-md">
			<span className="text-2xl  font-extrabold">Confirm Your Details</span>

			<div className="grid grid-cols-2 gap-4">
				<label className="text-gray-700 text-sm font-bold flex-1">
					First Name
					<input
						type="text"
						readOnly
						disabled
						className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
						{...register("firstName")}
					/>
				</label>
				<label className="text-gray-700 text-sm font-bold flex-1">
					Last Name
					<input
						type="text"
						readOnly
						disabled
						className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
						{...register("lastName")}
					/>
				</label>
				<label className="text-gray-700 text-sm font-bold flex-1">
					Email
					<input
						type="email"
						readOnly
						disabled
						className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
						{...register("email")}
					/>
				</label>
			</div>
		</form>
	);
};

export default BookingForm;
