import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";

import { BiSort } from "react-icons/bi";

const Search = () => {
	const search = useSearchContext();
	const [page, setPage] = useState<number>(1);

	const [selectedStars, setSelectedStars] = useState<string[]>([]);
	const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
	const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
	const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
	const [sortOption, setSortOption] = useState<string>("");

	const handleStarsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const starRating = e.target.value;

		setSelectedStars((prevStars) => (e.target.checked ? [...prevStars, starRating] : prevStars.filter((prevStar) => prevStar !== starRating)));
	};

	const handleHotelTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const hotelType = e.target.value;

		setSelectedHotelTypes((prevHotelTypes) => (e.target.checked ? [...prevHotelTypes, hotelType] : prevHotelTypes.filter((prevHotelType) => prevHotelType !== hotelType)));
	};

	const handleFacilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const facility = e.target.value;

		setSelectedFacilities((prevFacilities) => (e.target.checked ? [...prevFacilities, facility] : prevFacilities.filter((prevFacility) => prevFacility !== facility)));
	};

	const searchParams = {
		destination: search.destination,
		checkIn: search.checkIn.toISOString(),
		checkOut: search.checkOut.toISOString(),
		adultCount: search.adultCount.toString(),
		childCount: search.childCount.toString(),
		page: page.toString(),
		stars: selectedStars,
		types: selectedHotelTypes,
		facilities: selectedFacilities,
		maxPrice: selectedPrice?.toString(),
		sortOption: sortOption,
	};

	const { data: hotelData } = useQuery(["searchHotels", searchParams], () => apiClient.searchHotels(searchParams));

	return (
		<div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
			<div className="rounded-md border border-slate-300 p-5 h-fit  md:sticky md:top-10">
				<div className="space-y-5">
					<h3 className="text-lg font-semibold border-b border-slate-300 pb-5">Filter by:</h3>

					<StarRatingFilter
						selectedStars={selectedStars}
						onChange={handleStarsChange}
					/>
					<HotelTypesFilter
						selectedHotelTypes={selectedHotelTypes}
						onChange={handleHotelTypeChange}
					/>
					<FacilitiesFilter
						selectedFacilities={selectedFacilities}
						onChange={handleFacilityChange}
					/>
					<PriceFilter
						selectedPrice={selectedPrice}
						onChange={(value?: number) => setSelectedPrice(value)}
					/>
				</div>
			</div>

			<div className="flex flex-col gap-5">
				<div className="flex justify-between items-center">
					<span className="text-xl font-bold">
						{hotelData?.pagination.total} Hotels found {search.destination ? ` in ${search.destination}` : ""}
					</span>

					{/* SORT options */}
					<div className="flex items-center gap-0.5">
						<BiSort size={23} />
						<select
							className="focus:outline-none border border-slate-300 p-2 shadow-sm rounded-md"
							value={sortOption}
							onChange={(e) => setSortOption(e.target.value)}>
							<option value="">Sort By</option>
							<option value="starRatingAsc">Star Rating (low to high)</option>
							<option value="starRatingDesc">Star Rating (high to low)</option>
							<option value="pricePerNightAsc">Price Per Night (low to high)</option>
							<option value="pricePerNightDesc">Price Per Night (high to low)</option>
						</select>
					</div>
				</div>

				{hotelData?.data.map((hotel) => (
					<div key={hotel._id}>
						<SearchResultsCard hotel={hotel} />
					</div>
				))}

				<div>
					<Pagination
						page={hotelData?.pagination.page || 1}
						pages={hotelData?.pagination.pages || 1}
						onPageChange={(page) => setPage(page)}
					/>
				</div>
			</div>
		</div>
	);
};

export default Search;
