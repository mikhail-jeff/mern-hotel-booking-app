import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";

type Props = {
	hotel: HotelType;
};

const LastestDestinationCard = ({ hotel }: Props) => {
	return (
		<Link
			to={`/detail/${hotel._id}`}
			className="relative cursor-pointer overflow-hidden rounded-md shadow-md">
			<div className="h-[300px]">
				<img
					src={hotel.imageUrls[0]}
					alt=""
					className="w-full h-full object-cover object-center rounded-md"
				/>
			</div>

			<div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md">
				<span className="text-white font-bold tracking-tight text-3xl line-clamp-1">{hotel.name}</span>
			</div>
		</Link>
	);
};

export default LastestDestinationCard;
