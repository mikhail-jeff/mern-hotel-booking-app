import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";
import { AiFillStar } from "react-icons/ai";

type Props = {
	hotel: HotelType;
};

const SearchResultsCard = ({ hotel }: Props) => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] border border-slate-300 rounded-md p-4 gap-4 shadow-md">
			<div className="w-full h-[300px]">
				<img
					src={hotel.imageUrls[0]}
					alt={hotel.name}
					className="w-full h-full object-cover object-center rounded-sm"
				/>
			</div>

			<div className="grid grid-rows-[1fr_2fr_1fr]">
				<div>
					<div className="flex items-center">
						<span className="flex">
							{Array.from({ length: hotel.starRating }).map((_, index) => (
								<AiFillStar
									key={index}
									className="fill-yellow-400"
								/>
							))}
						</span>
						<span className="ml-1 text-sm">{hotel.type}</span>
					</div>
					<Link
						to={`/detail/${hotel._id}`}
						className="text-2xl font-bold">
						{hotel.name}
					</Link>
				</div>

				<div>
					<div className="line-clamp-5">{hotel.description}</div>
				</div>

				<div className="grid grid-cols-2 items-end whitespace-nowrap">
					<div className="flex gap-1 items-center">
						{hotel.facilities.slice(0, 3).map((facility, index) => (
							<span
								key={index}
								className="bg-slate-300 px-2 py-1 rounded-lg font-semibold text-xs whitespace-nowrap">
								{facility}
							</span>
						))}
						<span className="text-xs font-medium">{hotel.facilities.length > 3 && `+${hotel.facilities.length - 3} more`}</span>
					</div>

					<div className="flex flex-col items-end gap-1">
						<span className="font-semibold">${hotel.pricePerNight} / night</span>
						<Link
							to={`/detail/${hotel._id}`}
							className="bg-blue-600 rounded-md h-full text-white p-2 text-sm max-w-fit font-bold hover:bg-blue-500">
							View More
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchResultsCard;
