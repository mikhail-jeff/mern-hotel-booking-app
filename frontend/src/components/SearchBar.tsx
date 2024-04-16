import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { GiCommercialAirplane } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchBar = () => {
	const search = useSearchContext();

	const navigate = useNavigate();

	const [destination, setDestination] = useState<string>(search.destination);
	const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
	const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
	const [adultCount, setAdultCount] = useState<number>(search.adultCount);
	const [childCount, setChildCount] = useState<number>(search.childCount);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		search.saveSearchValues(destination, checkIn, checkOut, adultCount, childCount);

		navigate("/search");
	};

	const handleClear = () => {
		setDestination("");
		setCheckIn(new Date());
		setCheckOut(new Date());
		setAdultCount(1);
		setChildCount(0);
	};

	const minDate = new Date();
	const maxDate = new Date();
	maxDate.setFullYear(maxDate.getFullYear() + 1);

	return (
		<form
			onSubmit={handleSubmit}
			className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center gap-4">
			<div className="flex flex-row items-center flex-1 bg-white p-2 rounded-sm">
				<GiCommercialAirplane
					size={23}
					className="mr-2"
				/>
				<input
					type="text"
					placeholder="Where to?"
					className="text-md w-full focus:outline-none rounded-sm"
					value={destination}
					onChange={(e) => setDestination(e.target.value)}
				/>
			</div>

			<div className="flex bg-white px-2 py-1 gap-2">
				<label className="flex items-center">
					Adults:
					<input
						type="number"
						className="w-full p-1 focus:outline-none rounded-sm"
						min={1}
						max={20}
						value={adultCount}
						onChange={(e) => setAdultCount(parseInt(e.target.value))}
					/>
				</label>
				<label className="flex items-center">
					Child:
					<input
						type="number"
						className="w-full p-1 focus:outline-none rounded-sm"
						min={0}
						max={20}
						value={childCount}
						onChange={(e) => setChildCount(parseInt(e.target.value))}
					/>
				</label>
			</div>

			<div>
				<DatePicker
					selected={checkIn}
					onChange={(date) => setCheckIn(date as Date)}
					selectsStart
					startDate={checkIn}
					endDate={checkOut}
					minDate={minDate}
					maxDate={maxDate}
					placeholderText="Check-in Date"
					className="min-w-full bg-white p-2 focus:outline-none rounded-sm"
					wrapperClassName="min-w-full"
				/>
			</div>
			<div>
				<DatePicker
					selected={checkOut}
					onChange={(date) => setCheckOut(date as Date)}
					selectsStart
					startDate={checkIn}
					endDate={checkOut}
					minDate={minDate}
					maxDate={maxDate}
					placeholderText="Check-out Date"
					className="min-w-full bg-white p-2 focus:outline-none rounded-sm"
					wrapperClassName="min-w-full"
				/>
			</div>

			<div className="flex gap-1">
				<button className="w-2/3 bg-blue-600 text-white h-full p-2 font-bold text-md hover:bg-blue-500 rounded-sm">Search</button>
				<button
					onClick={handleClear}
					className="w-1/3 flex-1 bg-red-600 text-white p-2 font-bold text-md hover:bg-red-500 rounded-sm">
					Clear
				</button>
			</div>
		</form>
	);
};

export default SearchBar;
