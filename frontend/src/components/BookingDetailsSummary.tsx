import { HotelType } from "../../../backend/src/shared/types";

type Props = {
	checkIn: Date;
	checkOut: Date;
	adultCount: number;
	childCount: number;
	numberOfNights: number;
	hotel: HotelType;
};

const BookingDetailsSummary = ({ checkIn, checkOut, adultCount, childCount, numberOfNights, hotel }: Props) => {
	return (
		<div className="grid gap-4 rounded-md border border-slate-300 p-5 shadow-md flex-1 h-full">
			<h2 className="text-2xl font-extrabold">Your Booking Details</h2>

			<div className="border-b py-1">
				Hotel:
				<div className="font-bold">{hotel.name}</div>
			</div>

			<div className="border-b py-1">
				Location:
				<div className="font-bold">
					{hotel.city}, {hotel.country}
				</div>
			</div>

			<div className="flex justify-between py-1">
				<div>
					Check-in:
					<div className="font-bold">{checkIn.toDateString()}</div>
				</div>
				<div>
					Check-out:
					<div className="font-bold">{checkOut.toDateString()}</div>
				</div>
			</div>

			<div className="border-t border-b py-1">
				Total length of stay:
				<div className="font-bold">
					{numberOfNights} {numberOfNights === 1 ? "night" : "nights"}
				</div>
			</div>

			<div>
				Guests:
				<div className="font-bold">
					{adultCount} {adultCount > 1 ? "adults" : "adult"} &amp; {childCount} children
				</div>
			</div>
		</div>
	);
};

export default BookingDetailsSummary;
