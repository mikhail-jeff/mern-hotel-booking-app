import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<HotelFormData>();

	return (
		<div className="text-gray-700">
			<h2 className="text-2xl font-bold mb-3">Guests</h2>

			<div className="grid grid-cols-2 p-6 gap-5 bg-gray-300">
				<label className="text-gray-700 text-sm font-bold flex-1">
					Adults
					<input
						type="number"
						min={1}
						className="border rounded w-full py-1 px-2 font-normal focus:outline-none"
						{...register("adultCount", { required: "This field is required" })}
					/>
					{errors.adultCount && <span className="text-red-500 font-bold text-xs">{errors.adultCount.message}</span>}
				</label>

				<label className="text-gray-700 text-sm font-bold flex-1">
					Children
					<input
						type="number"
						min={0}
						className="border rounded w-full py-1 px-2 font-normal focus:outline-none"
						{...register("childCount", { required: "This field is required" })}
					/>
					{errors.childCount && <span className="text-red-500 font-bold text-xs">{errors.childCount.message}</span>}
				</label>
			</div>
		</div>
	);
};

export default GuestsSection;
