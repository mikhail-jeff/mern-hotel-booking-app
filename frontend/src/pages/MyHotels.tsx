import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";

import iso3166 from "iso-3166-1-alpha-2";
import { IoLocationOutline, IoPeopleOutline } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { HiOutlineBuildingOffice } from "react-icons/hi2";

const MyHotels = () => {
	const { data: hotelData } = useQuery("fetchMyHotels", apiClient.fetchMyHotels, {
		onError: () => {},
	});

	if (!hotelData) {
		return <span>No Hotels Found!</span>;
	}

	return (
		<div className="space-y-5">
			<span className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">My Hotels</h1>
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
						<h2 className="text-2xl font-bold">{hotel.name}</h2>
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
								{hotel.adultCount} adults, {hotel.childCount} child
							</div>
							<div className="border border-slate-300 rounded-md p-3 flex items-center shadow-md">
								<FaRegStar className="mr-1" />
								{hotel.starRating} {hotel.starRating === 1 ? "star" : "stars"}
							</div>
						</div>

						<span className="flex justify-end">
							<Link
								to={`/edit-hotel/${hotel._id}`}
								className="flex bg-blue-600 rounded-md text-white p-2 font-bold hover:bg-blue-500 text-lg shadow-md">
								View Details
							</Link>
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default MyHotels;
