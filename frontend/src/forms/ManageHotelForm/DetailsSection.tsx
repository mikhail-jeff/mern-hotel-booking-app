import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<HotelFormData>();

	return (
		<div className="flex flex-col gap-4">
			<h2 className="text-3xl font-bold text-center mb-8">Add Hotel</h2>

			<label className="text-gray-700 text-sm font-bold flex-1">
				Name
				<input
					type="text"
					className="border rounded w-full py-1 px-2 font-normal focus:outline-none"
					{...register("name", { required: "This field is required" })}
				/>
				{errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
			</label>

			<div className="flex flex-col md:flex-row gap-5">
				<label className="text-gray-700 text-sm font-bold flex-1">
					City
					<input
						type="text"
						className="border rounded w-full py-1 px-2 font-normal focus:outline-none"
						{...register("city", { required: "This field is required" })}
					/>
					{errors.city && <span className="text-red-500 text-xs">{errors.city.message}</span>}
				</label>

				<label className="text-gray-700 text-sm font-bold flex-1">
					Country
					<input
						type="text"
						className="border rounded w-full py-1 px-2 font-normal focus:outline-none"
						{...register("country", { required: "This field is required" })}
					/>
					{errors.country && <span className="text-red-500 text-xs">{errors.country.message}</span>}
				</label>
			</div>

			<label className="text-gray-700 text-sm font-bold flex-1">
				Description
				<textarea
					rows={10}
					placeholder="Write something..."
					className="border rounded w-full py-1 px-2 font-normal focus:outline-none"
					{...register("description", { required: "This field is required" })}></textarea>
				{errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
			</label>

			<label className="text-gray-700 text-sm font-bold max-w-[50%]">
				Price Per Night
				<input
					type="number"
					min={1}
					className="border rounded w-full py-1 px-2 font-normal focus:outline-none"
					{...register("pricePerNight", { required: "This field is required" })}
				/>
				{errors.pricePerNight && <span className="text-red-500 text-xs">{errors.pricePerNight.message}</span>}
			</label>

			<label className="text-gray-700 text-sm font-bold max-w-[50%]">
				Star Rating
				<select
					className="border rounded w-full p-1 focus:outline-none font-normal"
					{...register("starRating", { required: "This field is required" })}>
					<option
						value=""
						className="font-normal">
						Select a Rating
					</option>
					{[1, 2, 3, 4, 5].map((num) => (
						<option
							key={num}
							value={num}>
							{num}
						</option>
					))}
				</select>
				{errors.starRating && <span className="text-red-500 text-xs">{errors.starRating.message}</span>}
			</label>
		</div>
	);
};

export default DetailsSection;
