import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import React from "react";

import { MdDeleteForever } from "react-icons/md";

const ImagesSection = () => {
	const {
		register,
		formState: { errors },
		watch,
		setValue,
	} = useFormContext<HotelFormData>();

	const existingImageUrls = watch("imageUrls");

	const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageUrl: string) => {
		e.preventDefault();

		setValue(
			"imageUrls",
			existingImageUrls.filter((url) => url !== imageUrl)
		);
	};

	return (
		<div className="text-gray-700">
			<h2 className="text-2xl font-bold mb-3">Images</h2>

			<div className="border rounded p-4 flex flex-col gap-4 shadow-sm">
				{existingImageUrls && (
					<div className="grid grid-cols-6 gap-4">
						{existingImageUrls.map((url, index) => (
							<div
								className="relative group"
								key={index}>
								<img
									src={url}
									alt=""
									className="min-h-full object-cover rounded-sm"
								/>
								<button
									onClick={(e) => handleDelete(e, url)}
									className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white duration-300">
									<MdDeleteForever
										size={22}
										title="delete"
									/>
								</button>
							</div>
						))}
					</div>
				)}

				<input
					type="file"
					multiple
					accept="image/*"
					className="w-full font-normal"
					{...register("imageFiles", {
						validate: (imageFiles) => {
							const totalLength = imageFiles.length + (existingImageUrls?.length || 0);

							if (totalLength === 0) {
								return "At least one image should be added";
							}

							if (totalLength > 6) {
								return "Total number of images cannot be more than 6";
							}

							return true;
						},
					})}
				/>
			</div>
			{errors.imageFiles && <span className="text-red-500 font-bold text-xs">{errors.imageFiles.message}</span>}
		</div>
	);
};

export default ImagesSection;
