import { useQuery, useMutation } from "react-query";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

import iso3166 from "iso-3166-1-alpha-2";
import { format } from "date-fns";

import { IoLocationOutline, IoPeopleOutline } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { HiOutlineBuildingOffice } from "react-icons/hi2";

import { MdDeleteForever } from "react-icons/md";

const MyHotels = () => {
	const { showToast } = useAppContext();

	const [confirmationData, setConfirmationData] = useState<{ id: string; message: string } | null>(null);

	const { data: hotelData, refetch } = useQuery("fetchMyHotels", apiClient.fetchMyHotels, {
		onError: () => {},
	});

	const deleteHotel = useMutation(apiClient.deleteMyHotel, {
		onSuccess: () => {
			showToast({ message: "Hotel Deleted!", type: "SUCCESS" });
			refetch();
			setConfirmationData(null);
		},
		onError: () => {
			showToast({ message: "Error Deleting Hotel", type: "ERROR" });
		},
	});

	const handleDeleteConfirmation = (hotelId: string) => {
		setConfirmationData({ id: hotelId, message: "This action will permanently delete the hotel. Are you sure you want to continue?" });
	};

	const handleDelete = () => {
		if (confirmationData) {
			deleteHotel.mutate(confirmationData.id);
		}
	};

	if (!hotelData) {
		return <span>No Hotels Found!</span>;
	}

	return (
		<div className="space-y-5">
			<span className="flex justify-between items-center mb-10">
				<h1 className="text-3xl font-bold">
					My Hotels <span className="opacity-80">({hotelData.length})</span>
				</h1>
				<Link
					to="/add-hotel"
					className="flex bg-blue-600 rounded-md text-white p-2 font-bold hover:bg-blue-500 text-lg">
					Add Hotel
				</Link>
			</span>

			<div className="grid grid-cols-1 gap-8">
				{hotelData.map((hotel) => (
					<div
						key={hotel._id}
						className="flex flex-col justify-between border border-slate-300 rounded-md p-6 gap-5 shadow-md">
						<span className="flex items-center justify-between">
							<h2 className="text-2xl font-bold">{hotel.name}</h2>
							<MdDeleteForever
								size={22}
								className="cursor-pointer active:scale-90 duration-300"
								title="delete"
								onClick={() => handleDeleteConfirmation(hotel._id)}
							/>
						</span>
						<p className="mt-[-20px] text-sm opacity-60 italic">Last updated: {format(new Date(hotel.lastUpdated), "EEEE, MMMM do, yyyy HH:mm")}</p>
						<p className="whitespace-pre-line text-justify">{hotel.description}</p>

						<div className="grid md:grid-cols-3 lg:grid-cols-5 gap-2">
							<div className="border border-slate-300 rounded-md p-3 flex items-center shadow-md">
								<IoLocationOutline className="mr-1" />
								{hotel.city}, {iso3166.getCode(hotel.country)}
							</div>
							<div className="border border-slate-300 rounded-md p-3 flex items-center shadow-md">
								<HiOutlineBuildingOffice className="mr-1" />
								{hotel.type}
							</div>
							<div className="border border-slate-300 rounded-md p-3 flex items-center shadow-md">
								<MdAttachMoney className="mr-1" />
								{hotel.pricePerNight} / night
							</div>
							<div className="border border-slate-300 rounded-md p-3 flex items-center shadow-md">
								<IoPeopleOutline className="mr-1" />
								{hotel.adultCount} {hotel.adultCount > 1 ? "adults" : "adult"}, {hotel.childCount} child
							</div>
							<div className="border border-slate-300 rounded-md p-3 flex items-center shadow-md">
								<FaRegStar className="mr-1" />
								{hotel.starRating} {hotel.starRating === 1 ? "star" : "stars"}
							</div>
						</div>

						<span className="flex justify-end mt-4">
							<Link
								to={`/edit-hotel/${hotel._id}`}
								className="flex bg-blue-600 rounded-md text-white p-2 font-bold hover:bg-blue-500 text-base shadow-md">
								View Details
							</Link>
						</span>
					</div>
				))}

				{confirmationData && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-80">
						<div className="bg-white p-5 rounded-lg">
							<p className="text-2xl font-medium mb-2">Confirm deleting hotel</p>
							<p className="font-medium">{confirmationData.message}</p>
							<div className="mt-4 flex justify-center font-medium gap-2">
								<button
									onClick={() => setConfirmationData(null)}
									className="bg-gray-400  text-gray-800 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600">
									Cancel
								</button>
								<button
									onClick={handleDelete}
									className="bg-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 hover:bg-blue-500 focus:ring-blue-600">
									Ok
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default MyHotels;
