import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { IoLocationOutline } from "react-icons/io5";
// import { MdDeleteForever } from "react-icons/md";

const MyBookings = () => {
	const { data: hotels } = useQuery("fetchMyBookings", apiClient.fetchMyBookings);

	if (!hotels || hotels.length === 0) {
		return <span>No booking found</span>;
	}
	return (
		<div className="space-y-5">
			<h1 className="text-3xl font-bold">My Bookings</h1>

			{hotels.map((hotel) => (
				<div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] border border-slate-300 rounded-md p-4 gap-4 shadow-md">
					<div className="lg:w-full lg:h-[300px]">
						<img
							src={hotel.imageUrls[0]}
							alt=""
							className="w-full h-full object-cover object-center rounded-sm"
						/>
					</div>

					<div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
						<div className="text-2xl font-bold">
							<div className="flex justify-between items-center">
								<span>{hotel.name}</span>
								{/* <MdDeleteForever
									size={22}
									className="cursor-pointer active:scale-90 duration-300 text-red-600 hover:text-red-500"
									title="delete"
								/> */}
							</div>

							<div className="text-xs font-semibold">
								<IoLocationOutline
									size={18}
									className="mr-1 inline-block"
								/>
								{hotel.city}, {hotel.country}
							</div>
						</div>
						{hotel.bookings.map((booking) => (
							<div>
								<div>
									<span className="font-semibold mr-2">Dates:</span>
									<span>
										{new Date(booking.checkIn).toDateString()} - {new Date(booking.checkOut).toDateString()}
									</span>
								</div>

								<div>
									<span className="font-semibold mr-2">Guests:</span>
									<span>
										{booking.adultCount} {booking.adultCount === 1 ? "adult" : "adults"} &nbsp;&amp;&nbsp; {booking.childCount} child
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default MyBookings;
